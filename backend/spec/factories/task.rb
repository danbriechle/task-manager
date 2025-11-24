FactoryBot.define do
  factory :task do
    title   { "Test Task" }
    content { "Some content for the task." }
    status  { :pending }
    due_at  { nil }

    trait :in_progress do
      status { :in_progress }
    end

    trait :blocked do
      status { :blocked }
    end

    trait :completed do
      status { :completed }
    end
  end
end
