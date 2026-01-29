"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Calendar,
  Clock,
  ArrowLeft,
  Tag,
  Share2
} from "lucide-react";
import { Link, useParams } from "wouter";

interface Post {
  meta: {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    readTime: string;
    image: string;
    published: boolean;
    author: string;
    tags: string[];
  };
  html: string;
}

export default function BlogPost() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;

      try {
        const res = await fetch(`/api/blog/${slug}`);
        if (!res.ok) {
          setError("Post not found");
          return;
        }
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">{error || "The article you're looking for doesn't exist."}</p>
          <Link href="/blog">
            <Button className="bg-lime-400 text-gray-950 hover:bg-lime-500">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center">
              <Zap className="w-5 h-5 text-gray-950" />
            </div>
            <span className="font-bold text-lg text-lime-400">Ayothedoc</span>
          </Link>
          <Link href="/blog">
            <Button variant="outline" size="sm" className="border-lime-400/30 text-lime-400 hover:bg-lime-400/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </nav>

      {/* Article Header */}
      <header className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(163, 230, 53, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-1 text-sm text-lime-400 bg-lime-400/10 px-3 py-1 rounded-full mb-6">
              <Tag className="w-4 h-4" />
              {post.meta.category}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.meta.title}
            </h1>

            <div className="flex items-center justify-center gap-6 text-gray-400 text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.meta.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.meta.readTime}
              </span>
              {post.meta.author && (
                <span>By {post.meta.author}</span>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Featured Image */}
      {post.meta.image && (
        <div className="container mx-auto px-4 -mt-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <img
              src={post.meta.image}
              alt={post.meta.title}
              className="w-full rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      )}

      {/* Article Content */}
      <article className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-gray-100 prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-lime-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-100
              prose-code:text-lime-400 prose-code:bg-gray-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
              prose-blockquote:border-l-lime-400 prose-blockquote:bg-gray-900/50 prose-blockquote:py-1
              prose-li:text-gray-300
              prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {/* Tags */}
          {post.meta.tags && post.meta.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-800">
              <h3 className="text-sm font-semibold text-gray-400 mb-4">TAGS</h3>
              <div className="flex flex-wrap gap-2">
                {post.meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm text-gray-400">Share this article:</span>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-400 hover:text-lime-400 hover:border-lime-400/30"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
          </div>
        </motion.div>
      </article>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Automate Your Business?
            </h2>
            <p className="text-gray-400 mb-8">
              Let us help you save 40+ hours per month with custom automation solutions tailored to your business needs.
            </p>
            <Link href="/">
              <Button size="lg" className="bg-lime-400 text-gray-950 hover:bg-lime-500">
                Get Your Free Audit
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center">
                <Zap className="w-5 h-5 text-gray-950" />
              </div>
              <span className="font-bold text-lime-400">Ayothedoc</span>
            </div>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Ayothedoc. All rights reserved.
            </p>
            <Link href="/blog" className="text-sm text-lime-400 hover:underline">
              More Articles
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
