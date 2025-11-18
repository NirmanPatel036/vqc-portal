-- Create newsletter_subscribers table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);

-- Enable Row Level Security (RLS)
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for newsletter signup)
CREATE POLICY "Allow public inserts" ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to view all subscribers
CREATE POLICY "Allow authenticated users to view" ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Create policy to allow you (as admin) to view and delete
-- Replace 'your-user-id' with your actual Supabase user ID from auth.users
-- CREATE POLICY "Allow admin full access" ON newsletter_subscribers
--   FOR ALL
--   TO authenticated
--   USING (auth.uid() = 'your-user-id'::uuid);
