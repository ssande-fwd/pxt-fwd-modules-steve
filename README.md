# Extension Development Tips

## Architecture

There are 4 layers to the Forward Education extension ecosystem: base, module library, product, tutorial.

The base holds internally developed dependencies for our module library extension. This includes styling, generic enums, shared module functionality, and shared clients.

The module library extension contains all the individual functionalities that are depended on by our products. Generally a module represents a Jacdac module, but in the case of the breakout board it has actually been broken out into 3 modules: fwd-pump, fwd-servo-continuous, and fwd-servo-positional. Each of these modules is a standalone extension, so a downstream product extension could include the pump functionality of the breakout board but not the servo functionality.

A product extension does not introduce any functionality. It represents a collection of functionalities from the module library. Product extensions are where tutorials are stored, so the product extension repo actually hosts both the product layer and tutorial layer. Tutorials are just predefined, shareable MakeCode projects with extra features.

In summary, a tutorial has a product (usually just one), a product has modules (usually more than 1), and a module has at least 1 base dependency.

The rationale for this architecture starts with the fact that for maximum reliability an extension's dependencies should always have specified versions. When that rule is applied it becomes simpler to avoid having an extension depend on something in the same repo, so that becomes the second rule: don't host more than 1 layer in the same repo. The exception is tutorials which depend on a product extension and are stored in the same repo as it. This allows logical organization of tutorials with minimal extension approval overhead. If tutorials didn't need to be hosted by approved extensions maybe it would make sense to have tutorials in their own repo.

In theory you can have everything in a singular extension and also specify dependency tags, but then you have to either use a tag that you intend to create but haven't yet (commit with 1.0.1 dependency version and then bump to 1.0.1) or do multiple consecutive dependency update then bump cycles of the same repo to cascade the changes down the chain. Interesting in theory, but not fun in practice.

## Development

Since the products / tutorials are the last item in the dependency chain and have specified the versions of their dependencies, you can safely have changes in the base and module library layers without affecting production. There is maximum control over production code.

After making changes to base you can use 'update-dependency.py' in the module library to quickly update that dependency throughout the modules. Remember to run './init.sh' afterwards to update intellisense.

You may find usage of \% instead \$ for prefacing block variables in the block text (i.e. set \%this to 0°). Don't use \%. It's the old way and was replaced in favor of $.

### Considerations for Approved Extensions

Search Results Card Title: the repo name trimmed of "pxt-"
Search Results Card Description: the repo about section
Search Query Target: the repo about section and README file

It's best to put "fwd" somewhere in the about section. This ensures the extension will be at the top of the list if somebody searches fwd. If you rely on it getting picked up in the README other extensions can jump ahead of it in the search results.

If the h1 in the README matches the name of the extension in pxt.json then it is ignored by the MakeCode docs generator. This is a good thing because the docs generator makes an h1 automatically, so if the README h1 was included there would be two h1's.

### Intellisense

-   To get intellisense throughout the module library run './init.sh'.
-   You can get intellisense for any individual module or extension by running './init.sh \<directory\>'.
-   These scripts are just 'mkc init' followed by deletion of files that I didn't find useful.
-   Intellisense comes from pxt_modules, so when a dependency is updated you need to update pxt_modules.

### Testing

Test files are specified under "testFiles" in pxt.json can be executed in two ways.

One way is to import the extension using the import button on the MakeCode homepage. For the module library import an individual module rather than the whole library. The test files will compile into 1 program that automatically runs in the simulator. You can generally add the appropriate simulators using 'ADD SIMULATORS' button and view console logs in 'Show data' view. You can edit the module files in MakeCode and push / pull changes using the GitHub interface. This interface is accessible through a button next to the project name in the bottom bar.

The other way is to run 'mkc' to see if the test files compile. This compilation test also happens through the makecode.yml GitHub action, where applicable (product extensions). You can deploy the program to a micro:bit with 'mkc -d'.

It's admirable to strive for functional testing where you see the blocks in action, but simple compilation tests are always a great starting point. For a compilation test, all you have to do is drag one of each block into your program and copy that JavaScript. Functional tests can always be added later. Functional tests are only suitable for individual modules, not product extensions.

For quick and comprehensive compilation testing of tutorial content, the code for each tutorial is included as a test file. Each tutorial test uses a unique namespace to avoid clashes. These tests should be run before updating product extension dependencies in the tutorials.

### Versioning

'mkc bump' creates a new version of the extension. Always run it from the top level of the repo so that it will update the pxt.json files for all subdirectories. In other words, do not bump an indivudual module. Bump the whole module library.

For product versioning there is a particular breakdown of v1.2.3:

1. MAJOR. This change has caused an error in tutorial code compilation or modifies functionality in a way that requires manual testing.
2. MINOR. The dependent tutorials can be switched to this version without concern. Likely just visual block changes that won't affect tutorial viability.
3. PATCH. A tutorial has been added or modified.

You can specify the version of a dependency by either the tag or commit .

> "fwd-dial": "github:Forward-Education/pxt-fwd-modules/fwd-dial#v1.0.0</br>
> "fwd-dial": "github:Forward-Education/pxt-fwd-modules/fwd-dial#253d6ef9d5641a783ec666412b6e9bd9fea0eeb0

When the version is not specified for the dependency, most of the time MakeCode picks the most recent tag, or the most recent commit if there are no tags. However, most of the time is not all of the time and specifying a version reduces the risk of bad code making it into production, so always specify the versions of dependencies for production.

## General Info

### Extension Approval

Extension approval is a surprisingly rigorous process that is necessary to avoid unapproved content disclaimers appearing in tutorials and allow the extension to appear in MakeCode's searchable extension library. Some things to do to meet their standards:

-   make sure function and parameter descriptions are complete by clicking on blocks in the JavaScript MakeCode view
-   follow the observable code formatting, sometimes it's the way it is because micro:bit says so
    -   generally, spell out words entirely throughout the code unless it's a universal abbreviation like LED (i.e. don't shorten position1 to pos1)
    -   have all block text be lowercase unless you have a justification such as aligning with labels printed on the module
-   make sure the icon, pxt.json description, README, and repo about section all say it's for V2 micro:bit (Jacdac requires V2)
-   preface extension names (pxt.json) with "fwd-" to ensure uniqueness

### Block Order

Blocks are first formally grouped by module. Then they are informally grouped by service (if a module uses more than one service). Then the order is by block type: event blocks, action blocks, status blocks, conditional blocks. You can tell the block type by it's shape. Use existing modules as a reference. Then the order is by a qualitative assessment of usefulness. More useful to less useful.

module -> service -> block type -> usefulness

These are guidelines, not rules. For example, the calibrate pH action block fits most naturally below the other block types, so no need to force it to be somewhere else.

### Tutorials

A tutorial for a product should be stored in the product's extension. If the tutorial uses multiple products then it should be stored in the "all" extension. Tutorials are developed and tested in the [tutorial tool](https://makecode.com/tutorial-tool). Then they can be added either using VS Code or through MakeCode. It's best to bump (create a release) through MakeCode UI because it clears the cache and gives the option to optimize tutorial caching.

## Common Issues

Avoid these common mistakes. They can lead to frustrating issues.

An extension is introduced as a dependency more than once and there are inconsistencies in name, version, or organization (example below).

> "fwd-dial": "github:Forward-Education/pxt-fwd-modules/fwd-dial#v2.2.2</br>
> "**fwd-edu-dial**": "github:Forward-Education/pxt-fwd-modules/fwd-dial#v2.2.2</br>
> "fwd-dial": "github:Forward-Education/pxt-fwd-modules/fwd-dial#**v1.1.1**</br>
> "fwd-dial": "github:**ssande-fwd**/pxt-fwd-modules/fwd-dial#v2.2.2

You ran 'mkc bump' in a module rather than in the top-level.

You didn't include 'test.ts' in 'testFiles' or you included it in 'files' (pxt.json).

You didn't specify the dependency version and are relying on an unreliable system to pick the most recent version.
