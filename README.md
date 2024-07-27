# get-react-template

## Overview

`get-react-template` is a powerful and easy-to-use CLI tool designed to help you quickly set up a variety of project templates, including React, Vite, Tailwind, Node API, and more. This tool provides a menu-based interface where you can select a template, get detailed descriptions, and automatically set up your project with the necessary configurations and dependencies.

## Features

- Multiple project templates to choose from
- Detailed description, GitHub repository link, and author information for each template
- Automated project setup with just a few commands
- Easy-to-follow instructions for running your newly created project

## Installation

To install `get-react-template` globally, run:

```bash
npm i -g get-react-template
```

## Usage

To start using `get-react-template`, simply run:

```bash
npx get-react-template <name: optional>
```

## How It Works

1. **Run the command**: Execute `npx get-react-template` in your terminal.
2. **Select a template**: Use the menu to browse through the available templates.
3. **View details**: Each template provides a description, the GitHub repository link, and the author's name.
4. **Setup the project**: Once you select a template, the tool will fetch the necessary files and set up the project for you.
5. **Run the project**: Follow the provided instructions to start your project.

## Example

Here's an example of what the terminal interaction might look like:

```bash
$ npx get-react-template
? Select a template (Use arrow keys)
❯ React - A basic React setup with webpack
  Vite - Fast Vite setup for modern web development
  Tailwind - Tailwind CSS with PostCSS
  Node API - Simple Node.js API boilerplate

Description: A simple description about the project.
Live Preview: https://previewLink
Github Repository: https://github.com/git/repo
Owner: Author name
Thanks to https://github.com/author
```

After selecting a template, you'll see something like this:

```bash
Creating the template for <template name> ..

✨ Successfully created the template for <template name>

Installing node packages with npm...

🎉 The template was setup successfully

To start the app run: 
    
    cd <project>

    npm start (or the best suited command)
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue on GitHub.

## License

This project is licensed under the MIT License.

## Author

Created by Tushar Garg

## Links

- [GitHub Repository](https://github.com/tushargarg0987/get-react-template)

---

With `get-react-template`, setting up new projects has never been easier. Enjoy coding!