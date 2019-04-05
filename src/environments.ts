interface IEnvironment {
  name: string;
  apiKey: string;
}

const environments: IEnvironment[] = [
  {
    apiKey: 'a414a223-31bf-455a-ac8f-d4c5974af0c0',
    name: 'Pager QA',
  },
  {
    apiKey: 'e10b61f2-b331-4992-8631-f7ece95bb821',
    name: 'Pager Staging',
  },
  {
    apiKey: '737fc632-0a91-4397-b801-d985638990a5',
    name: 'Horizon QA',
  },
  {
    apiKey: 'f808312e-02d9-498c-bcb8-8da453e0678f',
    name: 'Horizon Staging',
  },
];

export default environments;
