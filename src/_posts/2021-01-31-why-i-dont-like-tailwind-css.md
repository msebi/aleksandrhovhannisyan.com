---
title: Why I Don't Like Tailwind CSS
description: On paper, Tailwind CSS sounds like a great idea. In reality, it suffers from the same problems that it tries to solve.
keywords: [tailwind css, tailwind, don't like tailwind]
tags: [dev, css, tailwind, frameworks]
canonical_url: https://www.aleksandrhovhannisyan.com/blog/why-i-dont-like-tailwind-css/
---

You're at a restaurant, and there's an odd item on the menu that you've never heard of before, but it piques your interest. It sounds like it might be worth a try, though you're not sure.

When the waiter approaches your table, you inquire about the dish; he notes that while most people are initially repulsed by its appearance, they should still give it a try because the chef swears that it's *supremely delicious*. So, trusting his judgment, you order the dish and wait.

When your meal arrives, it looks just as unpleasant as it did in the menu. But you're not one to judge—you're willing to try new things. You carve into a slice of it and take a reluctant bite. And... well, it's really not that great.

In a nutshell, this was my experience with Tailwind CSS. It's not the worst thing to happen to CSS, but it's certainly not the panacea that its supporters claim it is—and, in fact, it has a *lot* of problems.

See, the strange thing is that I actually read through all of [Adam Wathan's article on semantic CSS](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/), and I found myself initially agreeing with his points. Adam argues that the whole "semantic CSS" paradigm does not pan out in practice, and that developers tend to gravitate towards a **Utility CSS** approach over the course of their careers. According to this paradigm, your class names should be as granular as possible, responsible for one main task. These utility classes serve as the basic building blocks ("tokens") of your UI, allowing you to chain them together to implement complex designs. For example, if you find yourself repeating `display: flex` or `flex-wrap: wrap` in your CSS, you may want to abstract these out into utility classes, like `flex` or `flex-wrap`, that you can apply to any element.

> *"I’ve written a few thousand words on why traditional 'semantic class names' are the reason CSS is hard to maintain, but the truth is you’re never going to believe me until you actually try it. If you can suppress the urge to retch long enough to give it a chance, I really think you'll wonder how you ever worked with CSS any other way."* —[Adam Wathan](https://tailwindcss.com/), Tailwind CSS landing page

On paper, utility CSS actually sounds like it may be useful. In practice, though, Tailwind CSS (and utility CSS in general) suffers from the same issues that it attempts to solve and is, in my honest opinion, not worth your time.

{% include toc.md %}

## But First, Why Does Tailwind CSS Exist?

Before we discuss the problems with Tailwind CSS, it's worth looking at why the framework was created in the first place and the problems that it's trying to solve. This is mostly covered in Adam Wathan's article linked above, which I highly recommend that you read even if you don't like Tailwind. I already mentioned some of the motivations behind Tailwind, but I'll recap them here.

One of the arguments that people in favor of Tailwind usually make is that the "semantic CSS" approach is flawed because your well-named CSS classes give a false sense of order and reason, when in reality there's a good deal of complex (and repeated) logic in your CSS. It's also difficult to come up with consistent standards for spacing, colors, and other design guidelines, and this can lead to bloated CSS and inconsistently styled UIs. Tailwind aims to solve these problems.

This is one of the arguments that Adam uses in his article. He notes that with the semantic CSS approach, there's this inherent coupling of HTML to CSS, where either your HTML classes dictate your CSS or vice versa. And thus, the whole "separation of concerns" principle falls apart because your HTML and CSS **depend on each other**.

> "*I had "separated my concerns", but there was still a very obvious coupling between my CSS and my HTML. Most of the time my CSS was like a mirror for my markup; perfectly reflecting my HTML structure with nested CSS selectors.*
>
> *My markup wasn't concerned with styling decisions, but my CSS was very concerned with my markup structure.*
>
> *Maybe my concerns weren't so separated after all.*" —[CSS Utility Classes and "Separation of Concerns"](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/)

In principle, this makes sense. But as we'll see, Tailwind doesn't actually solve this problem of "separation of concerns." And it actually introduces several other problems.

## Why Tailwind Isn't Worth Your Time

With that out of the way, let's look at some of the reasons why I don't like Tailwind CSS.

### 1. Tailwind Makes Your Code Difficult to Read

[Other people who don't like Tailwind](https://dev.to/jaredcwhite/why-tailwind-isn-t-for-me-5c90) tend to start off by arguing that it makes your HTML look noisy and disgusting, and I'll do the same. Honestly, it's a valid argument if you care at all about your developer experience. Tailwind makes your markup difficult to read for several reasons that I'd like to explore here.

First, like Bootstrap, it's **semantically obscure** because all of its class names are awkward abbreviations. This means that you have to first learn Tailwind's specific syntax before you can fluently string its utility classes together to achieve powerful results. So, when you're first starting out with Tailwind, things will actually be painfully slow, and you'll find yourself frequently referencing the documentation to find the right classes to use. The initial promise of rapid prototyping is quite a ways off until you become familiar with the framework.

In my personal experience, poor naming conventions (or just poor variable names in general) are the source of a lot of confusion when other people read your code. I would rather look at some CSS that has `padding: 0.25rem` or `margin: 0.5rem` instead of trying to mentally map Tailwind's `p-1` or `m-2` to their CSS equivalents. Vanilla CSS, and CSS preprocessors like SCSS or LESS, do not impose much of a mental burden when you read them. Tailwind gets even worse with media queries—which, as you may have guessed, come in the form of prefixed class names:

```html
<div class="w-16 h-16 md:w-32 md:h-32 lg:w-48 lg:h-48"></div>
```

Another reason why Tailwind is so hard to read is because it requires you to pan your eyes **horizontally rather than vertically**. You know how designers recommend that you keep your copy centered on the page, somewhere around 60 characters, to make it easier for people to read? That's because the wider your text is, the more difficult it is for a reader's eyes to jump to the next line, and the more difficult it is to find that one particular word you're looking for in a wall of horizontal text. Yet this is the very thing that Tailwind forces you to do. When you string a bunch of class names together, you get markup that looks like this:

```html
<div
  class="w-16 h-16 rounded text-white bg-black py-1 px-2 m-1 text-sm md:w-32 md:h-32 md:rounded-md md:text-base lg:w-48 lg:h-48 lg:rounded-lg lg:text-lg"
>
  Yikes.
</div>
```

Unfortunately, ESLint/Prettier won't even properly format your classes or push them onto a new line—they'll just push the `className` prop down, but the string itself could go on forever. This may force you to scroll your editor horizontally to view the full list of classes. Tailwind's own documentation suffers from this very problem—many code blocks overflow horizontally and force you to scroll to find the relevant class in a sea of strings.

Over in CSS land, things are much easier to parse—you only have to scan your code *vertically*, so it's easier to search for a particular `property: value` pair. Plus, you get proper syntax highlighting, which clearly separates your properties from the values and makes things easier to read. With Tailwind, all your classes use your editor's color for strings. There are no properties or values because they've been stuffed into the class names themselves.

Here's the raw CSS equivalent of the Tailwind CSS above:

```css
.thing {
  width: 16px;
  height: 16px;
  color: white;
  background-color: black;
  padding: 0.25rem 0.5rem;
  margin: 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

@media screen and (min-width: 768px) {
  .thing {
    width: 32px;
    height: 32px;
    border-radius: 0.375rem;
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

@media screen and (min-width: 1024px) {
  .thing {
    width: 48px;
    height: 48px;
    border-radius: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
}
```

If you're tracking down a UI bug and you know it's not in your tablet/desktop version, then you can simply ignore the blocks of media queries and focus on the base styles. Over in Tailwind-land, you have to mentally exclude the responsive class names as you scan your classes horizontally, and then you have to figure out how all of these separate pieces fit together to create the final look of your UI. I find it much, much easier to just read the CSS above to see what's going on. There's a clear **separation of concerns**, and thats a good thing.

Another complaint I have with Tailwind is that, unlike CSS, it doesn't allow you to chain selectors to avoid repeating yourself. So if all of your active, hover, and focus states require the same CSS, you're going to very quickly bloat your classes. With CSS, you could just do this:

```css
.foo:focus,
.foo:active,
.foo:hover {
  /* CSS goes here */
}
```

While we're on the topic of semantics and legibility, let's address one last elephant in the room: **code reviews**. I am fortunate to have only worked with Tailwind CSS in local sandboxes, and not in any production projects or on an actual team of other devs.

I'm comfortable reading other people's code, and making sense of their logic and relating their markup to their CSS. But if I have to look at ~1000 LOC changes in a PR, and most of that is coming from long strings of class names, I'm not going to be happy. It's also going to be more difficult for me to make suggestions that could eliminate redundant CSS or simplify your markup.

It's information overload—in the Semantic CSS world, we first make sense of the markup with the help of well-named classes or IDs, and then we mentally associate these "things" with concrete CSS rules. Everything is easier to parse because we're taking it one thing at a time, and semantic classes help us to make sense of what we're looking at.

With Tailwind, you're forced to **interpret semantics on the fly**. The person who originally wrote the code probably had some idea of what they were creating, somewhere in the back of their mind. But they've probably forgotten it by now, and you have to guess what a particular slice of markup is responsible for just by reading an alphabet soup of classes.

### 2. Tailwind Is Vendor Lock-in

Look, I don't like Tailwind for *lots* of reasons. But none of them are nearly as concerning to me as **vendor lock-in**. It's why I don't want to invest time in migrating existing projects to Tailwind, and why I'd be reluctant to use it for any new projects.

Once you build an app with Tailwind, moving it to any other CSS framework or library in the future is going to be grueling. There are tools like Windy for [converting existing CSS to Tailwind](https://usewindy.com/), which sounds like a fairly easy thing to do. After all, Tailwind just breaks "compound" semantic classes down into "atomic" utility classes that have single responsibilities. If you have `.some-thing` that applies a bunch of CSS, then you can easily map `.some-thing`'s CSS rules to Tailwind classes.

But I can't imagine that it's possible to create a tool that does the reverse: **converting Tailwind to semantic HTML and CSS**. The only thing you could realistically convert Tailwind to is some other utility framework (e.g., Bootstrap) that locks you in with its own syntax and class names.

Because Tailwind classes are atomic building blocks that only do one thing, you can't really build more complex, semantic things out of them without assembling those classes by hand. After all, what assumptions would an automated tool make about your desired naming conventions, anyway? What is this `div`, or `img`, or `ul` that I'm looking at? *What do I call it*?

If you use Tailwind, **you're stuck with it**, unless you can tolerate converting all of that CSS to semantic CSS by hand. If you want to move to anything in the future that's not Tailwind, good luck. You'll either need to create your own in-house utility framework or use another one. Either way, it's never a good thing when a tool locks you into a particular paradigm, with no way out.

### 3. Tailwind Is Bloated

Utility CSS is inherently broken and bloated. Why? Because every new class name that you introduce could have potentially hundreds of property-value combinations, and that translates to more compiled CSS—which, of course, means a larger network request, and potentially slower performance.

Look no further than pseudo-class selectors like `:hover`, `:focus`, `:active`, and `:focus-within` to see why this is such a big deal. In fact, it's a problem that Tailwind is *very well aware of*. [Just read its documentation](https://v1.tailwindcss.com/docs/pseudo-class-variants):

> Not all pseudo-class variants are enabled for all utilities by default due to file-size considerations, but we've tried our best to enable the most commonly used combinations out of the box.

Translation: Tailwind is a costly abstraction, and its creators have tried their very best to hide this fact from you.

### 4. Tailwind Is an Unnecessary Abstraction

All Tailwind classes do just one thing, and that's DRY, which is a good thing because someone said so. But... let's think about this for a second: Is Tailwind as reusable and "clean" as it's marketed?

For one, the great thing about ordinary CSS classes is that they usually *don't* do just one thing. After all, that's why classes exist in the first place—to help you group related styles together so you can reuse them.

With Tailwind, if you want to group related styles together under a reusable class name, you need to use [`@apply` directives](https://tailwindcss.com/docs/extracting-components#extracting-component-classes-with-apply), like in this example taken from the docs:

```html
<button class="btn-indigo">
  Click me
</button>

<style>
  .btn-indigo {
    @apply py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75;
  }
</style>
```

If it's not already obvious, `@apply` **completely violates Tailwind's founding and guiding principles**. The fact that this jailbreak even exists is troubling. What exactly is the difference between using `@apply` and just using the CSS rules that correspond to your utility classes? There *is* no difference—except now, you've defeated the point of using a utility CSS framework in the first place, and you're better off just writing vanilla CSS to begin with.

Tailwind adds this weird layer of redundancy to your code, forcing you to repeat `flex`, `mx`, and `py` in your HTML classes rather than repeating the *same exact things* but in CSS. What do you gain from this, except that you don't have to give your components meaningful class names? Your utility classes are atomic building blocks, sure, but so are CSS property-value pairs. This is a classic case of creating unnecessary abstractions to solve problems that don't exist.

In his article on utility classes and semantic CSS, Adam only begins to explore an alternative approach to Semantic CSS when he realizes that semantics can lead to repeated CSS spread across multiple classes, with no way to reconcile the shared bit of code while keeping the semantics bit intact. The irony of Tailwind is that it claims to solve this problem of repetition in CSS, as well as the problems inherent in Semantic CSS. But it doesn't solve anything. It decides to marry our HTML and CSS and keep them in a single place since the "semantic" approach is strictly coupled anyway, so we may as well go with the flow.

But you're lying to yourself if you think this is any better than writing CSS directly, or any more maintainable than directly applying inline styles. Because instead of repeating styles in your CSS, **you're now repeating them in your HTML**, through class names. In fact, you're likely repeating yourself three, four, possibly *many more* times now because you can't chain selectors.

It's a classic party trick of misdirection. While the audience's eyes are fixed on one hand, the other works its magic, and viewers are amazed. Sure, you're no longer writing all that nasty semantic CSS, but... you're still writing *the exact same amount of CSS*, disguised as class names.

### 5. Semantics Is Important. Tailwind Forgoes It.

One of the most frequently cited arguments in favor of Tailwind is that Semantic CSS is difficult to achieve in practice because naming things is hard. Adam argues that this violates the principle of Separation of Concerns because now your HTML markup dictates your CSS. Effectively, you're making decisions in your HTML that really belong in your CSS. But let's think about this for a second: Is that really a problem?

For starters, if you're not sure what to call that `<div>` in your markup, consider whether it's actually needed. One of the great things about the Semantic CSS paradigm is that it forces you to structure your markup logically and meaningfully. It keeps you in check, ensuring that you don't just bloat your HTML with unnecessary wrapper elements on top of wrapper elements just to achieve whatever UI you're trying to build.

Freeing you from this constraint, Tailwind can actually encourage bad practices, where you no longer have to worry about that pesky "semantics" thing, and you can throw in as many `<div>`s as you want without caring about meaning. This goes hand in hand with the point I brought up earlier about Tailwind's legibility—when you have so many elements in a component soup of elements, and each one has a long string of class names, what even are you looking at anymore? Can you make sense of it at a glance?

Second, if you struggle to name things in the first place, this suggests that you'll run into communication issues down the line when discussing your UI with designers and other team members. If you can't name `X` element in your UI sensibly, and a conversation inevitably arises concerning that element, how are you going to refer to it? What are you going to call That Thing? Surely you can think of something. There's always a way to name things semantically.

Finally, remember that point I brought up earlier about how Tailwind CSS promotes ugly HTML markup? Supporters of the framework usually respond by reminding you that you're probably working with a component-based framework like React anyway, and so you're unlikely to be looking at a giant sea of markup in a single file. Fair point.

But I bring this up here because if you're using components, then you've likely **already given them sensible names**, haven't you? And if you've given your *components* sensible names, can you not apply that same pattern to your *class names*? This is where methodologies like BEM tend to shine (though I prefer a sort of pseudo-BEM approach that doesn't involve double underscores). Pick a convention and stick with it, and naming things becomes much easier.

In short, Tailwind pretends to solve a problem that isn't really a problem in the first place.

### 6. Tailwind and Dev Tools Don't Play Nicely

A minor note, but one that matters to me personally, because I've tried this whole "utility CSS" thing and am not convinced that it makes my job easier. As a front-end developer, I often find myself making little tweaks here and there in my browser through dev tools (which is especially useful when combined with `document.designMode = "on"`).

With Tailwind, tweaking styles is either very difficult or impossible, depending on what you're trying to do. To make tweaks, you can't play around with the CSS itself—you have to either change the class names by double-clicking them in your Elements pane and modifying the list, or you have to modify Tailwind's single-responsibility classes (which will mess up the rest of your UI).

It's worth noting that [there is a package called UI Devtools for Tailwind CSS](https://ui-devtools.com/) that aims to solve this problem. But unfortunately, it's sponsorware, meaning you have to sponsor the project on GitHub to be able to use it.

### 7. Tailwind Is Still Missing Some Key Features

Almost two years after its initial release, Tailwind CSS [still doesn't support pseudo elements](https://github.com/tailwindlabs/tailwindcss/discussions/2119) (among other features), something that basic CSS and CSS preprocessors have supported for years. Imagine having to write `before:content-empty-string` in your HTML when the CSS equivalent is much, much more legible.

I suspect this feature will be very costly to implement. For both `::before` and `::after`, you would need possibly thousands of unique class names just so you could style your pseudo-elements as needed. That's simply not realistic. It's the same reason why Tailwind is such a bloated mess—all those innumerable prefixed class names are costly. The more classes that Tailwind decides to introduce, the more its complexity will grow—to the point that it will not be usable.

## Fine, But What Should You Use Instead?

I know I bashed on Tailwind CSS quite a bit in this post. I'm sure it'll upset some people who like the framework, assuming anyone reads this. But regardless of how you feel about Tailwind, you'd probably agree that it's only fair of me to offer offer suggestions for alternatives. Agreed!

Before I do that, I want to note that it feels like Tailwind was initially created to solve a problem that no longer exists: **component-scoped CSS**. With frameworks like React and, more recently, Svelte, it's never been easier to write CSS without leaving your markup, and without resorting to inline styles. You don't really need BEM, either.

As far as libraries go, I'm a big fan of [`styled-jsx`](https://github.com/vercel/styled-jsx). It was created by Vercel, the company that also brought us Next.js, and it's one of the best CSS-in-JS libraries I've worked with to date. I find this remarkable, considering that I was, for the longest time, adamantly opposed to using CSS-in-JS. But `styled-jsx` is an absolute *delight* to work with.

For one, it's just CSS, so there's no new syntax that you have to learn. All styles are locally scoped, like with CSS Modules, but you can also easily apply global styles. Components can pass along class names to style sub-components, and this allows you to build truly modular and atomic components that don't mess with other parts of your UI. It's much easier to use than `styled-components` since your CSS is literally just another JSX element. You can still interpolate JavaScript values in your CSS, making this extremely powerful and easy to use.

Here's an example:

```jsx
const Navbar = (props) => {
  return (<header className="navbar-header">
    <nav class="navbar">
      <Branding />
      <ul className="navbar-menu"></ul>
    </nav>
    <style jsx>{`
      .navbar-header {
        position: ${props.isSticky ? 'fixed' : 'static'};
        left: 0;
        right: 0;
        z-index: 10;
      }
      .navbar {
        background-color: #1a1a1a;
        height: 64px;
      }
      .navbar-menu {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 24px;
      }
    `}</style>
  </header>);
}
```

Interpolating values is even more powerful if you define your design guidelines in a single place, like under a `variables` export, since this means you can **reuse a fixed set of values** throughout your components:

```jsx
const Navbar = (props) => {
  return (<header className="navbar-header">
    <nav class="navbar">
      <Branding />
      <ul className="navbar-menu"></ul>
    </nav>
    <style jsx>{`
      .navbar-header {
        position: ${props.isSticky ? 'fixed' : 'static'};
        left: 0;
        right: 0;
        z-index: 10;
      }
      .navbar {
        background-color: ${variables.color.black[900]};
        height: ${variables.spacing.lg};
      }
      .navbar-menu {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: ${variables.spacing.sm};
      }
    `}</style>
  </header>);
};
```

Sound familiar? This is one of the problems that Tailwind attempts to solve—restricting the infinite possibilities of vanilla CSS to a finite set of spacing, colors, and dimensions. With proper exports in place, you get the same benefit of having "design tokens" but without the problems inherent in Tailwind. You can even define mixins that you can call like ordinary functions to inject reusable bits of CSS into your code (SCSS users rejoice!).

In the case of really tiny components that only have one or two distinct elements, you can also directly target those `<div>`s or `<img>`s or whatever. Since your styles are scoped to just that component, you don't have to worry about your CSS rules tampering with other elements somewhere else in the app:

```jsx
const InfoIcon = () => (<svg>
  <style jsx>{`
    svg {
      /* CSS here is scoped to just this SVG */
    }
  `}</style>
</svg>)
```

If a component needs to customize another component's CSS, doing so is easy with `css.resolve`:

```jsx
import classnames from 'classnames';
import Child from '@components/Child'

const childStyles = css.resolve`
  .child-class-name {
    /* child CSS overrides go here */
  }
`;

const Parent = (props) => {
  return (<div className="parent">
    <Child className={classnames(childStyles.className, 'child-class-name')}>
    {childStyles.styles}
    <style jsx>{`
      .parent {
        /* parent CSS goes here */
      }
    `}</style>
  </div>);
}
```

The new styles will be more aggressively scoped than the child's base styles, meaning **you will never run into specificity issues**.

Finally, if you need to apply global styles, you can either use a global stylesheet:

```jsx
const Layout = () => (<main>
  <style jsx global>{`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
  `}</style>
</main>)
```

Or the one-off `:global` selector:

```jsx
const Component = () => (<div className="component">
  <style jsx>{`
    .component :global(selectorForStyleOverrides) {
      /* CSS here */
    }
  `}</style>
</div>);
```

And voila—just like that, you've solved all of the problems that Tailwind claims to, but without the tech debt. Because now, if you want to migrate your CSS to a different framework or library, all you have to do is copy-paste your rules. At the end of the day, it's **just vanilla CSS (in JS)**. You can easily port this to Gatsby, vanilla React, or even vanilla HTML/CSS/JS (with a bit more work).

## Final Thoughts

In the age of instant gratification, we've come to expect results quickly. Tailwind scratches this itch because it helps you to prototype UI very rapidly, without having to slow down and make important naming decisions. This can be useful in certain situations, like for a proof-of-concept demo or a prototype. However, if you're at all concerned about the long-term maintenance of your code base, or the cost of onboarding new developers and expecting them to understand what your code does, then Tailwind is just additional tech debt. And for that reason, and the others discussed here, I would not recommend using this CSS framework.

{:.no_toc}
## Attributions

This article's social media preview uses Tailwind CSS's logotype, which is [under the copyright of Tailwind Labs Inc](https://tailwindcss.com/brand#assets).