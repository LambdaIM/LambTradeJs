import Base from "./Base"
import { BigNumber } from "ethers"
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
  
  async  createOrder(nftAddress,tokenId,askPrice){
        let AskContract = this.getAskContract(false)
        let res = await AskContract.createAsk(nftAddress,tokenId,askPrice.toString(),
        this.Currency,this.account,0)
        return res

    }
    async  getOrder(nftAddress,tokenId){
        let AskContract = this.getAskContract(false)
        let res = await AskContract.askForNFT(nftAddress, tokenId)
        return res;
    }
    async fillOrder(nftAddress,tokenId){
      let AskContract = this.getAskContract(false)
      let orderInfo = await AskContract.askForNFT(nftAddress, tokenId)
      let overrides = {value: orderInfo.askPrice.toString()      }

      let res = await AskContract.fillAsk(
        nftAddress,
        tokenId,
        orderInfo.askCurrency,
        orderInfo.askPrice.toString(),
        ZERO_ADDRESS, 
        overrides)

    return res

    }
    async cancelOrder(nftAddress,tokenId){
      let AskContract = this.getAskContract(false)
      let res = await AskContract.cancelAsk(nftAddress,tokenId);
      return res
    }
   async fillOrders(ordersParameter){
    let AskContract = this.getAskContract(false)
    
    if((ordersParameter instanceof OrdersParameter)==false){
      throw new Error('The parameter needs to be OrdersParameter')
    }


    let allValue=BigNumber.from("0")
    let List=[]
    ordersParameter.parameters.forEach((item)=>{
      List.push({
        tokenContract: item.tokenContract,
        tokenId: item.tokenId,
        fillCurrency: item.askCurrency,
        fillAmount: item.askPrice,
        finder: ZERO_ADDRESS
      })

      let askPrice=BigNumber.from(item.askPrice)
      allValue=allValue.add(askPrice)
    })

    let overrides = {value: allValue.toString()}

    let res = await AskContract.fillAsks(List, overrides);
    return res


   }
   async createOrders(ordersParameter){
      if((ordersParameter instanceof OrdersParameter)==false){
        throw new Error('The parameter needs to be OrdersParameter')
      }
      console.log('createOrders')
      let this_=this;
      ordersParameter.parameters.forEach((item)=>{
        item.sellerFundsRecipient = this_.account
        item.askCurrency =this_.Currency

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
        let res = await AskContract.createAsks(ordersParameter.parameters)


        return res;
    }
    
    

}

export class OrdersParameter{
  constructor(){
    this.parameters=[]
  }
  add(nftAddress,tokenID,price){
    this.parameters.push({
      tokenContract:nftAddress,
      tokenId:tokenID,
      askPrice:price,
      askCurrency: ZERO_ADDRESS,
      sellerFundsRecipient:"",
      findersFeeBps: 0
    })

  }
}