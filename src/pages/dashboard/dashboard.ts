import {Options, Vue} from 'vue-class-component';
import Button from '@/components/button/button.vue';

@Options({
    comonents:{
        'app-button': Button
    }
})

export default class Dashboard extends Vue {

    public call() : void{
        setInterval(this.getPrice, 10000);
    }

    public getPrice() : void{

        const options = {method: 'GET', headers: {Accept: 'application/json'}};
        let printText = '';
    
        // UPBIT-API 호출
        fetch('https://api.upbit.com/v1/ticker?markets=KRW-BTC', options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            const result = response[0];
            
            // 가격 div 연결
            const div_price = document.getElementById("div_information");

            // 가격 정보 입력
            printText = result.market + " ";
            printText += result.trade_price.toLocaleString(/\B(?=(\d{3})+(?!\d))/g, ',') + " ";
            printText += result.trade_date_kst + " ";
            printText += result.trade_time_kst;
            
            div_price.textContent = printText;

        })
        .catch(err => console.error(err));
    }
}


