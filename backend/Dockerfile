FROM ruby:3.3

RUN apt-get update -qq && apt-get install -y \
  build-essential \
  nodejs \
  postgresql-client \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY backend/Gemfile backend/Gemfile.lock ./
RUN bundle install

COPY backend ./

ENV RAILS_ENV=development

EXPOSE 3000

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3000"]
