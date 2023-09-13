module.exports = {
    mode: 'development',
    entry: './packages/understand-how-module-work-in-ts/main.ts',
    output: {
        filename: '[name].js',
        path: '/Users/lilufei/Documents/lilufei/ks/self/dive-into-typescript/packages/understand-how-module-work-in-ts/output/ts-loader'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".json"]
    }
}