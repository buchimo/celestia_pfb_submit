{
    const api = {
        submit_pfb: "/submit_pfb"
    };

    const form = document.body.querySelector("form");

    // create transaction
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        document.getElementById("tx_result").innerHTML = "executing...";

        let tx_form = {
            "message": form['message'].value
        };

        console.log(tx_form)

        const connect = await fetch(api.submit_pfb, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(tx_form)
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Data error');
        }).then(data => {
            document.getElementById("tx_result").innerHTML = "<h3 style='color:green'>Submit Success</h3>";
            
            console.log(data)
            
            document.getElementById("tx_info").hidden = false
            document.getElementById("tx_info_Namespace_ID").innerHTML = data.namespace_id
            document.getElementById("tx_info_tx_hash").innerHTML = "<a target='_blank' href='https://testnet.mintscan.io/celestia-incentivized-testnet/txs/" + data.txhash + "?height=" + data.height + "'>" + data.txhash + "</a>";
            document.getElementById("tx_info_height").innerHTML = data.height;

            return data;
        }).catch(err => {
            document.getElementById("tx_result").innerHTML = "<h3 style='color:red'>Failed, Please make sure the celestia node is available and try again!</h3>";
        });
    });
}
