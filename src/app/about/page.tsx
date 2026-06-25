export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
          Artёm Gilmanov
        </p>
      </section>

      {/*
        TODO(Artem): The biography below contains conflicting employer/timeline
        claims that need your confirmation — please resolve before publishing:
          1. "currently working as an AI Software Engineer at CGM"
          2. "Before joining Google DeepMind in 2025..."
          3. "...I was a Technical Lead at Hugging Face"
        These three cannot all be the current/most-recent role. Which is your
        current employer, and what is the correct order/timeline of the others?
        (Typos have been fixed; factual claims were left untouched pending your
        confirmation so nothing is invented.)
      */}
      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <p>
          Hello, my name is Artёm Gilmanov. I am a Software Engineer based in Cologne, Germany. Currently I am working as an AI Software Engineer at CGM, where I am responsible for AI adoption — using LLMs for agents and utilising small language models in production.
        </p>
        <p>
          My mission is to help every developer to build with AI responsibly, ethically, and successfully, leveraging everything from open models to foundation models like Gemini and Gemma, across cloud and on-device platforms.
        </p>
        <p>
          Before joining Google DeepMind in 2025, I was a Technical Lead at Hugging Face, leading strategic collaborations and partnerships with major cloud providers (AWS, Google Cloud, Azure, Cloudflare, DigitalOcean, Dell).
        </p>
        <p>
          My passion for software engineering began over 10 years ago. I&apos;ve designed and implemented multiple cloud-native AI architectures for various industries and was recognized as the first German AWS Machine Learning Hero in 2021. I actively share my knowledge through research, blog posts, and on LinkedIn and X (formerly Twitter).
        </p>
        <p>
          On my blog, I share my learnings, break down complex concepts, share practical approaches, and provide insights.
        </p>
      </section>
    </div>
  );
}
