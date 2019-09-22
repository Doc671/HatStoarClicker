const CopyPlugin = require("copy-webpack-plugin");

module.exports = [
    {
        mode: "development",
        entry: {
            electron: "./src/electron.ts",
            pixi: "./src/pixi.ts"
        },
        target: "electron-main",
        module: {
            rules: [{
                test: /\.ts$/,
                include: /src/,
                use: [{
                    loader: "ts-loader"
                }]
            }]
        },
        node: {
            __dirname: false,
            __filename: false
        },
        output: {
            publicPath: "/hat-stoar-clicker/",
            path: __dirname + "/dist",
            filename: "[name].js"
        },
        plugins: [
            new CopyPlugin([{
                from: "src/",
                to: "",
                ignore: ["*.ts"]
            }])
        ],
        resolve: {
            extensions: [".js", ".json", ".ts"]
        }
    }
]
