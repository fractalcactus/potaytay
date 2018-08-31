class AddTopToMemories < ActiveRecord::Migration[5.2]
  def change
    add_column :memories, :top, :string
  end
end
