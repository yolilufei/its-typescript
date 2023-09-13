module.exports = {
    // mode: 'development',
    entry: './packages/understand-how-module-work-in-ts/main.ts',
    output: {
        filename: '[name].js',
        path: '/Users/lilufei/Documents/lilufei/ks/self/dive-into-typescript/packages/understand-how-module-work-in-ts/output/babel-loader'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-typescript']
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".json"]
    }
}