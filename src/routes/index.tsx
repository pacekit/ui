import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <main className="text-muted-foreground mt-32 flex items-center justify-center text-2xl font-semibold">
            Home Page
        </main>
    );
}
