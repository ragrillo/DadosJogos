const express = require("express");

const {google} = require ("googleapis");

const app = express();

app.set("view endine", "ejs");

app.use(express.urlencoded({ extended: true }));


app.get("/", async (req, res) =>{

    const auth =  new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes:"https://www.googleapis.com/auth/spreadsheets",

    });

    //Criando instancia do cliente
    const client = await auth.getClient();



    //Criando a instancia do Google Sheets API
    const googleSheets = google.sheets({version: "v4", auth:client});

    const spreadsheetId = "1-eTApSiLdEpTxGOZWKM1NPKKPNBw9PfZSVw6CyOqI1Y"

    //Get metadata abou spreadsheet

    const metadata = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,

        range: "Jogos!A1:E17",

    });


    //Escrendo linhas na planilhas

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Página1!A:B",

        valueInputOption: "USER_ENTERED",
        resource:{
            values:[
                ["Adicionando Novos Valores", "Teste"]
            ]
        }
    })

    res.send(getRows.data)
});



app.listen(1337, (req, res) => console.log("Rodando em 1337"));
