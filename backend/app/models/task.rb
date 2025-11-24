class Task < ApplicationRecord
  enum :status, {
    pending: 0,
    in_progress: 1,
    blocked: 2,
    completed: 3
  }

  validates :title, presence: true, length: { maximum: 120 }
end
