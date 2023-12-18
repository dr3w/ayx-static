const path = require("path");

(async () => {
    const { globby } = await import("globby");
    const { default: svg2img } = await import("svg2img");
    const { default: fs } = await import("fs");

    const paths = await globby("static/gitlab/svg/**/*.svg");
    paths.forEach((path, idx) => {
        // if (idx >= 2) return;
        try {
            svg2img(
                path,
                {
                    resvg: {
                        fitTo: {
                            mode: "width", // or height
                            value: 48,
                        },
                        logLevel: "info",
                    },
                },
                function (error, buffer) {
                    console.log(path, idx, error);
                    if (error || !buffer) return;

                    const newName = path.replace(/svg/g, "png");
                    fs.writeFileSync(newName, buffer);
                }
            );
        } catch (e) {
            console.error("Error:", path, idx, e);
        }
    });
})();
