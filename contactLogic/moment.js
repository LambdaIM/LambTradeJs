import dayjs from 'dayjs' 
import { providers } from 'ethers';


/**
 * 使用dayjs 进行时间相关的操作
 * @module Time
*/
export class Time{
    /**
    * 初始化时间
    * @constructor
    * @param {number} timestamp - 时间戳
    */
    constructor(timestamp){
        // let ethersprovider = new providers.Web3Provider(web3Provider);
        /**
         * dayjs 时间对象
        */
        this.time =dayjs.unix(timestamp);
    }
    /**
     * 获取时间戳
    */
    getTime(){
        return this.time.unix();
    }
    /**
     * 添加天
    */
    addDay(num) {
        return this.time.add(num, 'days').unix();
    }
    /**
     * 添加分
    */
    addMinute(num) {
        return this.time.add(num, 'minutes').unix();
    }
    /**
     * 添加小时
    */
    addHour(num) {
        return this.time.add(num, 'hours').unix();
    }
}

/**
 * 获取区块链时间和相关操作方法
 * @module moment
*/
export default class moment{
    constructor(web3Provider){
        // let ethersprovider = new providers.Web3Provider(web3Provider);
        if(web3Provider.getBlock){
            this.library=web3Provider;
        }else if(web3Provider.provider){
            this.library=web3Provider.provider
        }
        
    }
   async blockNow(){
    
    let data = await this.library.getBlock('latest')
    
    let timestamp =data.timestamp;
    return new Time(timestamp)
    }
}




/**
 * export function AddDayTimes(num) {
	return moment().add(num, 'days').unix();
}
export function getNow() {
	return moment().unix();
}
 * **/