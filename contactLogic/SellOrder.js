import Base from "./Base"

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export default class SellOrder extends Base{
   async setApprovalForModule(){
      let askaddress = this.getAskContract(false).address
      let res = await this.getZoraContract().setApprovalForModule(askaddress,true)
      return res;

    }

  async  checkApprovalForModule(){
       let res = await this.getZoraContract().userApprovals(this.account)
       return res

    }
  async  setApprovalForHelper(nftAddress){
        //nft Approval
        let NftIO = this.getNftInterface(nftAddress)
        let erc721Helperaddress = this.getErc721HelperContract(false).address
        let res = await NftIO.setApprovalForAll(erc721Helperaddress, true)
        return res;
    }
  async  checkApprovalForHelper(nftAddress){
        //check nft Approval
        let NftIO = this.getNftInterface(nftAddress)
        let erc721Helperaddress = this.getErc721HelperContract(false).address
        let res = await NftIO.isApprovedForAll(this.account,erc721Helperaddress)

        return  res
    }
  async  createOrder(nftAddress,tokenId,askPrice){
        let AskContract = this.getAskContract(false)
        let res = await AskContract.creatAsk(nftAddress,tokenId,askPrice.toString(),
        ZERO_ADDRESS,this.account)
        return res

    }
    async  getOrder(nftAddress,tokenId){
        let AskContract = this.getAskContract(false)
        let res = await AskContract.askForNFT(nftAddress, tokenId)
        return res;
    }
    creatOrders(nftAsks){
        let AskContract = this.getAskContract(false)
        let res = await AskContract.createAsks(nftAsks)


        return res;
    }
    
    

}