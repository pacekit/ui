import { createRelativeLink } from "fumadocs-ui/mdx";
import { DocsBody, DocsDescription, DocsPage, DocsTitle, EditOnGitHub } from "fumadocs-ui/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageActions } from "@/components/docs/layouts/actions";
import { DocsBreadcrumb } from "@/components/docs/layouts/breadcrumb";
import { CopyMarkdown } from "@/components/docs/layouts/copy-markdown";
import { Footer } from "@/components/docs/layouts/footer";
import { getMDXComponents } from "@/components/docs/mdx/mdx-components";
import { getMetadata, routes } from "@/lib/docs";
import { source } from "@/lib/source";
import { TOCAds } from "@/components/docs/TOCAds";

export async function generateStaticParams() {
    return source.generateParams();
}

export async function generateMetadata(props: PageProps<"/docs/[[...slug]]">): Promise<Metadata> {
    const params = await props.params;
    const page = source.getPage(params.slug);
    if (!page) notFound();

    return getMetadata({
        title: page.data.title,
        description: page.data.description,
    });
}

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
    const params = await props.params;
    const page = source.getPage(params.slug ?? []);
    if (!page) notFound();

    const MDXContent = page.data.body;
    return (
        <DocsPage
            toc={page.data.toc}
            full={page.data.full}
            footer={{ component: <Footer /> }}
            tableOfContent={{ style: "clerk", enabled: !params.slug?.includes("blocks"), footer: <div className="mt-3"><TOCAds/></div> }}
            article={{
                className: "gap-0 xl:!pe-12 2xl:!pe-16",
            }}>
            <DocsBreadcrumb slug={params.slug} />
            <DocsTitle className="mt-4">{page.data.title}</DocsTitle>
            <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
            <div className="flex gap-2 items-center mt-4">
                <EditOnGitHub
                    className="px-2.5"
                    href={`${routes.external.githubContent}${params.slug ? `${params.slug.join("/")}.mdx` : "index.mdx"}`}
                />
                <CopyMarkdown markdownPath={`${page.url}.mdx`} />
                <PageActions markdownPath={`${page.url}.mdx`} />
            </div>
            <DocsBody id="docs-body" className="my-10">
                <MDXContent
                    components={getMDXComponents({
                        a: createRelativeLink(source, page),
                    })}
                />
            </DocsBody>
        </DocsPage>
    );
}
