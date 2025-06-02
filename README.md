# Broken Link Checker

Compares the performance of Puppeteer, Playwright, and `fetch` (the Node.js `fetch` function) in the context of testing whether links are broken.

Here are the results of this experiment:
- Puppeteer:
    - Tested 100 links in 34.93 s, averaging 0.3493 s per link.
    - At ~10 links, connections start failing. Past 100 links, connections pretty much always fail. This is probably due to a limitation on how many tabs Chrome can handle in one shot.
- Playwright:
    - The results were pretty much the same as those of Puppeteer.
- `fetch`:
    - Tested 100 links in 34.93 s, averaging 0.3493 s per link.

## Contributing

### Installation

1. Install [Node.js](https://nodejs.org/en/download).
2. Clone the repo using one of the following methods:

    - SSH:

        ```shell
        git clone git@github.com:neelkamath/broken-link-checker.git 
        ```

    - HTTPS:

        ```shell
        git clone https://github.com/neelkamath/broken-link-checker.git
        ```

3. Install the dependencies:

    ```sh
    npm i
    ```

### Usage

- Puppeteer:

    ```shell
    npm run puppeteer
    ```

- Playwright:

    ```shell
    npm run playwright
    ```

- Node.js `fetch`:

    ```shell
    npm run playwright
    ```
