import { createElement } from "react";

import { loader } from "fumadocs-core/source";
import { docs } from "fumadocs-mdx:collections/server";
import { icons } from "lucide-react";

export const source = loader({
    source: docs.toFumadocsSource(),
    baseUrl: "/docs",
    icon: (icon) => {
        if (icon && icon in icons) return createElement(icons[icon as keyof typeof icons]);
    },
});
