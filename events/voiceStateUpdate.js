module.exports = async (client, oldState, newState) => {
  if(client.user.id === newState.id){
    if(oldState.channelId && !newState.channelId){
   const queue = client.player?.getQueue(newState.guild.id)
   if(queue){
    queue.metadata.send({ content: 'Bağlandığım ses kanalından biri beni kovdu, tüm oynatma listesi temizlendi! ❌' });
    client.player?.deleteQueue(queue.metadata.guild.id)
}
    }
  }
  }