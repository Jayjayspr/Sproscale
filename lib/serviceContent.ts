import { supabase } from './supabase';

export interface NicheContentOverride {
  intro_override: string | null;
  problem_override: string | null;
}

export interface NicheReview {
  id: string;
  author_name: string;
  company: string | null;
  quote: string;
  rating: number;
}

export interface NicheCase {
  id: string;
  title: string;
  description: string;
  result_stat: string | null;
  image_url: string | null;
}

// Publiek leesbare content (RLS: select-for-all) — veilig om met de anon-client op
// te halen, ook server-side. Wordt gebruikt om de generieke hub-content per niche
// te overschrijven zodra iemand een rij toevoegt via de Supabase Table Editor.
export async function getNicheContentOverride(serviceSlug: string, nicheSlug: string): Promise<NicheContentOverride | null> {
  const { data, error } = await supabase
    .from('service_niche_content')
    .select('intro_override, problem_override')
    .eq('service_slug', serviceSlug)
    .eq('niche_slug', nicheSlug)
    .maybeSingle();

  if (error || !data) return null;
  return data;
}

export async function getNicheReviews(serviceSlug: string, nicheSlug: string): Promise<NicheReview[]> {
  const { data, error } = await supabase
    .from('service_niche_reviews')
    .select('id, author_name, company, quote, rating')
    .eq('service_slug', serviceSlug)
    .eq('niche_slug', nicheSlug)
    .order('display_order', { ascending: true });

  if (error || !data) return [];
  return data;
}

export async function getNicheCases(serviceSlug: string, nicheSlug: string): Promise<NicheCase[]> {
  const { data, error } = await supabase
    .from('service_niche_cases')
    .select('id, title, description, result_stat, image_url')
    .eq('service_slug', serviceSlug)
    .eq('niche_slug', nicheSlug)
    .order('display_order', { ascending: true });

  if (error || !data) return [];
  return data;
}
