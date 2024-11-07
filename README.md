<!-- @format -->

## Sharing State Between Components

Sometimes, you want the state of two components to always change together. To do it, remove state from both of them, move it to their closest common parent, and then pass it down to them via props. This is known as lifting state up, and it’s one of the most common things you will do writing React code.

You will learn
How to share state between components by lifting it up
What are controlled and uncontrolled components
Lifting state up by example
In this example, a parent Accordion component renders two separate Panels:

Accordion
Panel
Panel
Each Panel component has a boolean isActive state that determines whether its content is visible.

import { useState } from 'react';

export default function Accordion() {
return (
<>

<h2>Almaty, Kazakhstan</h2>
<Panel title="About" isActive={true}>
With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
</Panel>
<Panel title="Etymology" isActive={true}>
The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
</Panel>
</>
);
}

function Panel({ title, children, isActive }) {
return (

<section className="panel">
<h3>{title}</h3>
{isActive ? (
<p>{children}</p>
) : (
<button onClick={() => setIsActive(true)}>
Show
</button>
)}
</section>
);
}

Show more
Try editing the hardcoded isActive values in the Accordion component and see the result on the screen.

Step 3: Add state to the common parent
Lifting state up often changes the nature of what you’re storing as state.

In this case, only one panel should be active at a time. This means that the Accordion common parent component needs to keep track of which panel is the active one. Instead of a boolean value, it could use a number as the index of the active Panel for the state variable:

const [activeIndex, setActiveIndex] = useState(0);
When the activeIndex is 0, the first panel is active, and when it’s 1, it’s the second one.

Clicking the “Show” button in either Panel needs to change the active index in Accordion. A Panel can’t set the activeIndex state directly because it’s defined inside the Accordion. The Accordion component needs to explicitly allow the Panel component to change its state by passing an event handler down as a prop:

<>
<Panel
isActive={activeIndex === 0}
onShow={() => setActiveIndex(0)}

>

    ...

  </Panel>
  <Panel
    isActive={activeIndex === 1}
    onShow={() => setActiveIndex(1)}
  >
    ...
  </Panel>
</>
The <button> inside the Panel will now use the onShow prop as its click event handler:

import { useState } from 'react';

export default function Accordion() {
const [activeIndex, setActiveIndex] = useState(0);
return (
<>

<h2>Almaty, Kazakhstan</h2>
<Panel
title="About"
isActive={activeIndex === 0}
onShow={() => setActiveIndex(0)} >
With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
</Panel>
<Panel
title="Etymology"
isActive={activeIndex === 1}
onShow={() => setActiveIndex(1)} >
The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
</Panel>
</>
);
}

function Panel({
title,
children,
isActive,
onShow
}) {
return (

<section className="panel">
<h3>{title}</h3>
{isActive ? (
<p>{children}</p>
) : (
<button onClick={onShow}>
Show
</button>
)}
</section>
);
}

Show more
This completes lifting state up! Moving state into the common parent component allowed you to coordinate the two panels. Using the active index instead of two “is shown” flags ensured that only one panel is active at a given time. And passing down the event handler to the child allowed the child to change the parent’s state.

Diagram showing a tree of three components, one parent labeled Accordion and two children labeled Panel. Accordion contains an activeIndex value of zero which turns into isActive value of true passed to the first Panel, and isActive value of false passed to the second Panel.
Initially, Accordion’s activeIndex is 0, so the first Panel receives isActive = true

The same diagram as the previous, with the activeIndex value of the parent Accordion component highlighted indicating a click with the value changed to one. The flow to both of the children Panel components is also highlighted, and the isActive value passed to each child is set to the opposite: false for the first Panel and true for the second one.
When Accordion’s activeIndex state changes to 1, the second Panel receives isActive = true instead

Deep Dive
Controlled and uncontrolled components

Show Details
A single source of truth for each state
In a React application, many components will have their own state. Some state may “live” close to the leaf components (components at the bottom of the tree) like inputs. Other state may “live” closer to the top of the app. For example, even client-side routing libraries are usually implemented by storing the current route in the React state, and passing it down by props!

For each unique piece of state, you will choose the component that “owns” it. This principle is also known as having a “single source of truth”. It doesn’t mean that all state lives in one place—but that for each piece of state, there is a specific component that holds that piece of information. Instead of duplicating shared state between components, lift it up to their common shared parent, and pass it down to the children that need it.

Your app will change as you work on it. It is common that you will move state down or back up while you’re still figuring out where each piece of the state “lives”. This is all part of the process!

To see what this feels like in practice with a few more components, read Thinking in React.
