import Base from "./Base"

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export default class BuyOrder extends Base{
    async setApprovalForModule(){
        let offeraddress = this.getOffersContract(false).address
        let res = await this.getZoraContract().setApprovalForModule(offeraddress ,true)
        return res;
  
      }
  
    async  checkApprovalForModule(){
         let offeraddress = this.getOffersContract(false).address
         let res = await this.getZoraContract().isModuleApproved(this.account,offeraddress)
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
    async createOffer(nftAddress,tokenId,offerPrice){
        console.log('createOffer')
        let OffersContract = this.getOffersContract(false)
        let overrides = { value: offerPrice.toString() }
        let res = await OffersContract.createOffer(
            nftAddress,
            tokenId,
            ZERO_ADDRESS,
            offerPrice,
            0, overrides
        )
        return res

    }
    async getOffer(nftAddress,tokenId,offerId){
        let OffersContract = this.getOffersContract(false)
        const offerInfo = await OffersContract.offers(nftAddress, tokenId, offerId);
        return offerInfo

    }
    async fillOffer(nftAddress,tokenId,offerId){
        let OffersContract = this.getOffersContract(false)
        const offerInfo = await OffersContract.offers(nftAddress, tokenId, offerId);
        let res = await OffersContract.fillOffer(
            nftAddress,
            tokenId,
            offerId,
            offerInfo.currency,
            offerInfo.amount,
            ZERO_ADDRESS
        )
        return res

    }

    

}