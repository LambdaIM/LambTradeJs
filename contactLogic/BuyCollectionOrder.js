import BuyBase from "./BuyBase"

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export default class BuyOrder extends BuyBase{
    async createOfferList(nftAddress,tokenId,offerPrice){
        
        let OffersContract = this.getOffersContract(false)
        let overrides = { value: offerPrice.toString() }
        let res = await OffersContract.createCollectionOffer(
            nftAddress,
            ZERO_ADDRESS,
            offerPrice,
            0, overrides
        )
        return res

    }
    async getOfferList(nftAddress,offerId){
        let OffersContract = this.getOffersContract(false)
        const offerInfo = await OffersContract.offersCollection(nftAddress,  offerId);
        return offerInfo

    }
    async fillOfferList(nftAddress,tokenId,offerId){
        let OffersContract = this.getOffersContract(false)
        const offerInfo = await OffersContract.offersCollection(nftAddress,  offerId);
        console.log(nftAddress,
            tokenId,
            offerId,
            offerInfo.currency,
            offerInfo.amount.toString(),
            ZERO_ADDRESS)
        let res = await OffersContract.fillCollectionOffer(
            nftAddress,
            tokenId,
            offerId,
            offerInfo.currency,
            offerInfo.amount.toString(),
            ZERO_ADDRESS
        )
        return res

    }
    async cancelOfferList(nftAddress,offerId){
        let OffersContract = this.getOffersContract(false)
        const res = await OffersContract.cancelOfferList(nftAddress,  offerId);
        return res

    }

    

}