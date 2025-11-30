import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, BookOpen, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext.jsx";

export default function Landing() {
  const { user, isLoading } = useAuth();

  if (!isLoading && user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50/40 to-coral-50/40">
      <header className="px-6 py-6 max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 text-white font-bold text-2xl flex items-center justify-center shadow-lg">
            I
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">Italiano Tutor</p>
            <p className="text-sm text-gray-500">Personalized language learning</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link to="/login">
            <Button variant="ghost" className="text-gray-700">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="px-6 py-12 max-w-6xl mx-auto flex flex-col gap-12 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
            <ShieldCheck className="w-4 h-4" />
            Tailored for modern learners
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Learn Italian with guidance from an AI tutor that adapts to you.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Track your lessons, chat with a conversational coach, and build fluency with structured paths built for
            beginners and intermediate learners alike.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/login">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 h-14 text-base font-semibold">
                Start learning now
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold border-gray-200">
                Create free account
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
              <MessageSquare className="w-8 h-8 text-green-600 mb-3" />
              <p className="font-semibold text-gray-900 mb-1">AI-powered chat practice</p>
              <p className="text-sm text-gray-600">Role-play real conversations and get instant feedback.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
              <BookOpen className="w-8 h-8 text-coral-600 mb-3" />
              <p className="font-semibold text-gray-900 mb-1">Curated lessons & tracking</p>
              <p className="text-sm text-gray-600">Stay organized with guided content and progress insights.</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
            <div>
              <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">What you’ll get</p>
              <ul className="space-y-3 text-gray-700">
                <li>• Bite-sized lessons tailored to your level</li>
                <li>• Personalized chat partner for daily practice</li>
                <li>• Motivating progress tracking</li>
                <li>• Instant access—no email verification needed</li>
              </ul>
            </div>
            <div className="p-4 rounded-2xl bg-green-50 border border-green-100">
              <p className="text-sm text-green-800">
                “Italiano Tutor helped me build confidence faster than any textbook. I love how every session feels personal.” –
                Sofia, beta learner
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

