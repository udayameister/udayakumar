import Section from "./Section";

export default function Blog({ posts }) {
  return (
    <Section id="blog" eyebrow="Updates" title="Research Blog">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="card">
            <p className="text-sm font-bold text-saffron">{post.date}</p>
            <h3 className="mt-3 text-lg font-extrabold text-ink dark:text-white">{post.title}</h3>
            <p className="mt-3 leading-7 text-ink/65 dark:text-white/65">{post.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
