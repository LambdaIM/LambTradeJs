
import SDK from '../contactLogic/index'
import { ethers,utils } from 'ethers';
import MinterSetPrice from './MinterSetPrice.json'
import Alleria from './Alleria.json'


/**
 * 0x5694c26EC2eC66632743379FA1336b7aA1801F78
 * nft 测试合约
 * 
*/

async function main(){
    let ethersprovider = new ethers.providers.Web3Provider(window.ethereum);
    let accountOBJ = await window.ethereum.enable()
    let chianidOBJ = await  ethersprovider.getNetwork();
  
    console.log(chianidOBJ,accountOBJ)
    let chianid =chianidOBJ.chainId;
    let account = accountOBJ[0];
    let sdkobj = new SDK(window.ethereum,account,chianid)
    console.log(sdkobj)
    
    let Signer = ethersprovider.getSigner(account)
    let _address= await  Signer.getAddress();
    console.log('_address',_address)

    let nftmintaddress = '0x6a20C503EC4EA2646aBd56E8607a7CAeEF8a1178';
    let Contract = new ethers.Contract(nftmintaddress,MinterSetPrice.abi,Signer)
    let nftaddress = '0x394db89002043aBB7f979CBb82c492f01372C4EF'
    let nftContract = new ethers.Contract(nftaddress,Alleria,Signer)

    let tokenID ="1000006";

    document.querySelector("#setApprovalForModule").addEventListener('click',async function(){
        console.log('- - -')
        let res = await sdkobj.SellOrder.setApprovalForModule()
        console.log(res)

    })

    document.querySelector("#checkApprovalForModule").addEventListener('click',async function(){
        console.log('- - -')
        let res = await sdkobj.SellOrder.checkApprovalForModule()
        console.log(res)

    })

    document.querySelector("#setApprovalForHelper").addEventListener('click',async function(){
        console.log('- - -')
        let res = await sdkobj.SellOrder.setApprovalForHelper(nftaddress)
        console.log(res)
    })

    document.querySelector("#checkApprovalForHelper").addEventListener('click',async function(){
        console.log('- - -')
        let res = await sdkobj.SellOrder.checkApprovalForHelper(nftaddress)
        console.log(res)

    })

    document.querySelector("#mintnft").addEventListener('click',async function(){
        console.log('- - -')
        let projectId = '1';
        let value =utils.parseUnits('30') 
        value = value.toString()
        
        let res = await Contract.purchase(projectId,{value:value})


        console.log(res)

    })
    document.querySelector("#readnft").addEventListener('click',async function(){
        console.log('- - -')
        
        const num = await nftContract.balanceOf(account);
        let data=[]

        for (let index = 0; index < num.toNumber(); index++) {
           let token = await nftContract.tokenOfOwnerByIndex(account, index)
           data.push(token.toNumber())
        }

        console.log(data)

    })

    document.querySelector("#createOrder").addEventListener('click',async function(){
        console.log('- - -')
        let value =utils.parseUnits('1') 
        let res = await sdkobj.SellOrder.createOrder(nftaddress,tokenID,value)
        console.log(res)

    })

    document.querySelector("#getOrder").addEventListener('click',async function(){
        console.log('- - -')
        let value =utils.parseUnits('1') 
        let res = await sdkobj.SellOrder.getOrder(nftaddress,tokenID)
        console.log(res)

    })

    document.querySelector("#createOrders").addEventListener('click',async function(){
        console.log('- - -')
        let value  =  utils.parseUnits('1') ;
        let value2 = utils.parseUnits('2')  ;

        let tokenID2 ="1000007";
        value  = value.toString();
        value2 = value2.toString();

        let list=[{
            nftAddress:nftaddress,tokenID,value
        },{
            nftAddress:nftaddress,tokenID:tokenID2,value:value2
        }]

        let res = await sdkobj.SellOrder.createOrders(list)
        console.log(res)

    })

    //createOrders

    /***
     * /**
     * 读区余额
    async balanceOf(){
        const contract = this.getAlleriaContractRead();
        const info = await contract.balanceOf(this.account);
            return info
    }
    /**
     * 读区token列表
    async listToken(){
        let num = await this.balanceOf();
        
        const contract = this.getAlleriaContractRead();
        let data=[]

        for (let index = 0; index < num.toNumber(); index++) {
           let token = await contract.tokenOfOwnerByIndex(this.account, index)
           data.push(token)
        }   
        return data
    }
     * **/

    

    

    

    


    
}
 setTimeout(()=>{
    main();
},1000*5)