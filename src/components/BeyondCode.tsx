"use client";

import { Tabs } from "radix-ui";
import {
  beyond,
  categoryLabels,
  type BeyondCategory,
  type BeyondItem,
} from "@/content/beyond";
import { Row, Section } from "./Section";

/*
  Radix's Tabs primitive is used directly rather than src/components/ui/tabs.tsx.
  The shadcn wrapper bakes in a pill background, fixed heights and a pseudo
  -element underline; unwinding all of that through className overrides is more
  fragile than styling the primitive from scratch. Radix is where the keyboard
  behaviour (arrows, Home/End, roving tabindex) lives, and that is preserved.
*/

const TRIGGER =
  "cursor-pointer whitespace-nowrap pb-1 text-muted-foreground transition-colors hover:text-foreground data-[state=active]:text-foreground data-[state=active]:underline data-[state=active]:decoration-1 data-[state=active]:underline-offset-[0.4em]";

function ItemList({ items }: { items: BeyondItem[] }) {
  return (
    <ul className="divide-y">
      {items.map((item, i) => (
        <Row
          key={item.title}
          delay={i * 0.03}
          meta={
            <>
              {item.period && <p className="edge">{item.period}</p>}
              {item.detail && (
                <p className="mt-2 font-mono text-[0.75rem]">{item.detail}</p>
              )}
            </>
          }
          // Category in the trailing rail. Redundant inside a filtered tab,
          // but "All" is the default view and it is the only thing there that
          // says what kind of entry you are looking at.
          trailing={
            <p className="edge text-faint">{categoryLabels[item.category]}</p>
          }
        >
          <h3 className="title text-[1.1875rem]">{item.title}</h3>
          <p className="mt-2 text-pretty text-muted-foreground">
            {item.description}
          </p>
        </Row>
      ))}
    </ul>
  );
}

export function BeyondCode() {
  // Drive order from categoryLabels, and skip any category with no items.
  const categories = (Object.keys(categoryLabels) as BeyondCategory[]).filter(
    (category) => beyond.some((item) => item.category === category),
  );

  return (
    <Section id="beyond" index="03" title="Beyond code">
      <Tabs.Root defaultValue="all">
        <Tabs.List
          className="-mb-px flex flex-wrap items-center gap-x-5 gap-y-2 border-b pb-2"
          aria-label="Filter activities by category"
        >
          <Tabs.Trigger value="all" className={TRIGGER}>
            All{" "}
            <span className="font-mono text-[0.75rem] text-faint">
              {beyond.length}
            </span>
          </Tabs.Trigger>

          {categories.map((category) => (
            <Tabs.Trigger key={category} value={category} className={TRIGGER}>
              {categoryLabels[category]}{" "}
              <span className="font-mono text-[0.75rem] text-faint">
                {beyond.filter((item) => item.category === category).length}
              </span>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content value="all" className="pt-4 outline-none">
          <ItemList items={beyond} />
        </Tabs.Content>

        {categories.map((category) => (
          <Tabs.Content
            key={category}
            value={category}
            className="pt-4 outline-none"
          >
            <ItemList
              items={beyond.filter((item) => item.category === category)}
            />
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </Section>
  );
}
