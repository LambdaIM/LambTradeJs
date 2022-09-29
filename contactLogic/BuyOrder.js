import BuyBase from "./BuyBase"

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export default class BuyOrder extends BuyBase{
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
        console.log(nftAddress,
            tokenId,
            offerId,
            offerInfo.currency,
            offerInfo.amount.toString(),
            ZERO_ADDRESS)
        let res = await OffersContract.fillOffer(
            nftAddress,
            tokenId,
            offerId,
            offerInfo.currency,
            offerInfo.amount.toString(),
            ZERO_ADDRESS
        )
        return res

    }

    async cancelOffer(nftAddress,tokenId,offerId){
        let OffersContract = this.getOffersContract(false)
        let res = await OffersContract.cancelOffer(nftAddress,tokenId,offerId)
        return res
    }

    

}