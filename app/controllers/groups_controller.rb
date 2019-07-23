class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]

  def index
    @groups = current_user.groups
  end  

  def new
    @group = Group.new
    @group.users << current_user
  end
  
  def create
    @group = Group.new(group_params)
    if @group.save
      respond_to do |format|
        format.html { redirect_to root_path, notice: 'グループを作成しました' }
        format.json
      end
    else
      flash[:alert] = "グループ名にデータを入力していないので保存できませんでした"
      render :new
    end
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      flash[:alert] = "グループ名にデータを入力していないので保存できませんでした。"
      render :edit
    end
  end
  
  private
  def group_params
   params.require(:group).permit(:name, user_ids:[])
  end

  def set_group
    @group = Group.find(params[:id])
  end
end