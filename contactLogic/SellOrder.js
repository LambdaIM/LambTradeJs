import Base from "./Base"

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export default class SellOrder extends Base{
   async setApprovalForModule(){
      let askaddress = this.getAskContract(false).address
      let res = await this.getZoraContract().setApprovalForModule(askaddress,true)
      return res;

    }

  async  checkApprovalForModule(){
       let askaddress = this.getAskContract(false).address
       let res = await this.getZoraContract().isModuleApproved(this.account,askaddress)
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
        let res = await AskContract.createAsk(nftAddress,tokenId,askPrice.toString(),
        ZERO_ADDRESS,this.account,0)
        return res

    }
    async  getOrder(nftAddress,tokenId){
        let AskContract = this.getAskContract(false)
        let res = await AskContract.askForNFT(nftAddress, tokenId)
        return res;
    }
   async createOrders(nftAsks){
      if((nftAsks instanceof Array)==false){
        throw new Error('The parameter needs to be an array')
      }
      console.log('createOrders')
      let parameters=[]
      nftAsks.forEach((item)=>{
        parameters.push({
            tokenContract:item.nftAddress,
            tokenId:item.tokenID,
            askPrice:item.value,
            askCurrency: ZERO_ADDRESS,
            sellerFundsRecipient:this.account,
            findersFeeBps: 0
        })

      })





        /**
         * let ask2 = {
            tokenContract,
            tokenId:,
            askPrice:,
            askCurrency: ZERO_ADDRESS,
            sellerFundsRecipient:,
            findersFeeBps: 0
            }
        */
        let AskContract = this.getAskContract(false)
        let res = await AskContract.createAsks(parameters)


        return res;
    }
    
    

}