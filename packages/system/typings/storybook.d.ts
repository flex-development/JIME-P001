declare type FCS<T extends {} = {}, P extends {} = {}> = {
  (args: T): JSX.Element

  args: T
  parameters?: P
  storyName?: string
}

