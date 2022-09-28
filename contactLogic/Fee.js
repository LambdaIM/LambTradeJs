import Base from "./Base"

export default class Fee extends Base{
    setFeeParams(accountaddress,percentage){
        let offeraddress =this.getOffersContract().address
        let num = Number(percentage)
        num = num * 100 ;

        this.getZoraFeeContract().setFeeParams(
            offeraddress,
            accountaddress,
            percentage
        )

    }
    setAlleria(nftaddress){
        let RoyaltyContract = this.getRoyaltyContract(false);
        let res = await RoyaltyContract.setAlleria(nftaddress);
        return res;
        
    }
    setRoyalty(nftaddress,projectId,accountaddress,percentage){
        let RoyaltyContract = this.getRoyaltyContract(false);
        let num = Number(percentage)
        num = num * 100 ;

        let res = await RoyaltyContract.setRoyalty(nftaddress,projectId,[accountaddress],[num]);

    }


}