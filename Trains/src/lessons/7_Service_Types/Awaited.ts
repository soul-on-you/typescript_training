type A = Awaited<Promise<string>>; // string
type A2 = Awaited<Promise<Promise<Promise<string>>>>; // string
