class AddLeftToMemories < ActiveRecord::Migration[5.2]
  def change
    add_column :memories, :left, :string
  end
end
