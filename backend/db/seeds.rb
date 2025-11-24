Task.destroy_all

STATUSES = Task.statuses.keys => ["pending", "in_progress", "blocked", "completed"]

ACTIONS = [
  "Mow",
  "Weedwack",
  "Paint",
  "Fumigate ",
  "Caulk",
  "Weed",
  "Water",
  "Change the heat pump in",
  "Wash"
].freeze

LOCATIONS = [
    "Pool",
    "Garage",
    "Living Room",
    "Dishwasher",
    "Laundry Room",
    "Elevator",
    "Library",
    "Conservatory"
].freeze


50.times do |i|
  action = ACTIONS.sample
  location = LOCATIONS.sample
  date = rand(0..30).days.from_now
  Task.create!(
    title: "#{action} the #{location} Ticket ##{i + 1}",
    content: "The #{location} is in a terrible state of disrepair. \n #{action} it ",
    status: STATUSES.sample,
    due_at: date
  )
end

puts "Seeded #{Task.count} tasks"