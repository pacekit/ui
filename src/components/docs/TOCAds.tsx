export const TOCAds = () => {
    return <a href="https://saaskit.paceui.com" target="_blank" className="block border group rounded relative">
        <img src="/images/ads/saaskit.jpg" className="w-full rounded-t" alt="SaaSKit"/>
        <div className="p-2 pt-1 bg-muted/40">
            <p className="font-medium">SaaSKit by PaceUI</p>
            <p className="mt-0.5 text-sm leading-tight text-muted-foreground">Launch your next SaaS idea faster with our modular kit</p>
        </div>
        <div className="absolute inset-0 group-hover:backdrop-blur-[1px] group-hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded flex items-center justify-center">
            <p className="text-white font-semibold text-lg">Visit SaaSKit</p>
        </div>
    </a>
}
