FROM ruby:3.3

# Install system deps
RUN apt-get update -qq && apt-get install -y \
  build-essential \
  nodejs \
  postgresql-client \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install gems
COPY backend/Gemfile backend/Gemfile.lock ./
RUN bundle install

# Copy app code (will be overridden by volume in dev)
COPY backend ./

ENV RAILS_ENV=development

EXPOSE 3000

# If you use bin/dev (Propshaft/Vite/etc), you can change this
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3000"]
