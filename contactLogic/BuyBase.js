import Base from "./Base"

export default class BuyBase extends Base{
    async setApprovalForModule(){
        let offeraddress = this.getOffersContract(false).address
        let res = await this.getZoraContract().setApprovalForModule(offeraddress ,true)
        return res;
  
      }
      async cancelApprovalForModule(){
        let offeraddress = this.getOffersContract(false).address
        let res = await this.getZoraContract().setApprovalForModule(offeraddress ,false)
        return res;
      }
  
    async  checkApprovalForModule(){
         let offeraddress = this.getOffersContract(false).address
         let res = await this.getZoraContract().isModuleApproved(this.account,offeraddress)
         return res
  
      }

}