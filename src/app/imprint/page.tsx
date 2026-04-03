export default function ImprintPage() {
  return (
    <div className="space-y-12 max-w-2xl mx-auto py-12">
      <section className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Imprint</h1>
        <div className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
          <p className="font-medium text-foreground">Information pursuant to § 5 TMG</p>
          <p>Artem Gilmanov</p>
          <p>Genter Str. 13-15</p>
          <p>50672 Cologne</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Contact</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          E-Mail: <a href="mailto:artemapochta@gmail.com" className="underline underline-offset-4 hover:text-foreground transition-colors">artemapochta@gmail.com</a>
        </p>
      </section>

      <div className="prose prose-neutral dark:prose-invert prose-sm max-w-none space-y-8">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold m-0">Liability for Contents</h2>
          <p>
            As service providers, we are liable for own contents of these websites according to p 7, Sect. 1 German Telemedia Act (TMG). However, according to ps 8 to 10 German Telemedia Act (TMG), service providers are not obligated to permanently monitor submitted or stored information or to search for evidences that indicate illegal activities.
          </p>
          <p>
            Legal obligations to removing information or to blocking the use of information remain unchallenged. In this case, liability is only possible at the time of knowledge about a specific violation of law. Illegal contents will be removed immediately at the time we get knowledge of them.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold m-0">Liability for Links</h2>
          <p>
            Our offer includes links to external third party websites. We have no influence on the contents of those websites, therefore we cannot guarantee for those contents. Providers or administrators of linked websites are always responsible for their own contents.
          </p>
          <p>
            The linked websites had been checked for possible violations of law at the time of the establishment of the link. Illegal contents were not detected at the time of the linking. A permanent monitoring of the contents of linked websites cannot be imposed without reasonable indications that there has been a violation of law. Illegal links will be removed immediately at the time we get knowledge of them.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold m-0">Copyright</h2>
          <p>
            You are permitted to use, modify, and build upon the content from artemgilmanov.com for both private and commercial purposes. This includes utilizing the information, ideas, articles, graphics, and designs provided, as long as appropriate credit is given to artemgilmanov.com and the original author, Artem Gilmanov.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold m-0">Attribution Requirements</h2>
          <p>
            If you republish, reshare, or publicly display any content from artemgilmanov.com, you must clearly attribute the work to Artem Gilmanov and include a link to the original source on. Modifications should be noted clearly if the original content has been altered significantly.
          </p>
        </section>
      </div>
    </div>
  );
}
