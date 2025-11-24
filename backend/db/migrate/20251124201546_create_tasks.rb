class CreateTasks < ActiveRecord::Migration[8.1]
   def change
    create_table :tasks do |t|
      t.string  :title,   limit: 120, null: false
      t.text    :content
      t.integer :status,  null: false, default: 0
      t.datetime :due_at

      t.timestamps
    end

    add_index :tasks, :status
    add_index :tasks, :due_at
  end
end
