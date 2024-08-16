"use client";
import { Separator } from "@/components/ui/separator";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { IBoard } from "@/types";

export default function BoardSideBarContent({
  boardData,
}: {
  boardData?: IBoard | undefined;
}) {
  const board = {
    id: "7f607bd8-b39c-4593-85f6-895d7ab3d3ab",
    title: "Optimized eco-centric challenge",
    description: "multi-tasking",
    coverPhoto: "https://picsum.photos/seed/hCCFglYCZm/640/480",
    visibility: "private",
    createdAt: "2024-08-15T10:49:32.967Z",
    members: [
      {
        id: "e89e7a06-cb0c-4b71-ad50-fb69fd0280f1",
        username: "Ona.Nitzsche98",
        email: "Francisca_Kuhlman90@yahoo.com",
        profileImage: "https://avatars.githubusercontent.com/u/83412688",
      },
      {
        id: "034b5131-5396-4dce-b31e-e80e876f7527",
        username: "Brook.VonRueden72",
        email: "Nicklaus_Williamson32@yahoo.com",
        profileImage: "https://avatars.githubusercontent.com/u/40334244",
      },
      {
        id: "ddeaee7c-d911-4a05-83ea-951c625aeea2",
        username: "Koby.Nienow",
        email: "Marty_OConnell91@hotmail.com",
        profileImage: "https://avatars.githubusercontent.com/u/63974396",
      },
      {
        id: "e89e7a06-cb0c-4b71-ad50-fb69fd0280f1",
        username: "Ona.Nitzsche98",
        email: "Francisca_Kuhlman90@yahoo.com",
        profileImage: "https://avatars.githubusercontent.com/u/83412688",
      },
      {
        id: "ba1a53c8-3dfa-44d1-82bf-c62817772c40",
        username: "Pascale85",
        email: "Tyrese_Kuhic23@gmail.com",
        profileImage:
          "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/441.jpg",
      },
      {
        id: "034b5131-5396-4dce-b31e-e80e876f7527",
        username: "Brook.VonRueden72",
        email: "Nicklaus_Williamson32@yahoo.com",
        profileImage: "https://avatars.githubusercontent.com/u/40334244",
      },
      {
        id: "b2fc4369-a0f9-459d-a9a7-a782fb4e400c",
        username: "Urban.Braun",
        email: "Jerrell.Turcotte@yahoo.com",
        profileImage: "https://avatars.githubusercontent.com/u/24087111",
      },
    ],
    admin: {
      id: "b2fc4369-a0f9-459d-a9a7-a782fb4e400c",
      username: "Urban.Braun",
      email: "Jerrell.Turcotte@yahoo.com",
      profileImage: "https://avatars.githubusercontent.com/u/24087111",
    },
    taskLists: [
      {
        id: "61155a0f-58ab-464a-b315-ad9d0a892906",
        title: "deploy e-business mindshare",
        createdAt: "2024-08-14T21:29:21.552Z",
        cards: [
          {
            id: "9172454f-5f11-4ac9-8988-d2f8f6a1ff8f",
            taskId: "d16c4e5f-7efa-4aad-9660-d3afd330c703",
            title: "Gorgeous Steel Shoes",
            description:
              "Velociter despecto ipsam custodia cernuus odio clarus celo eius. Repellendus tantillus patria calamitas caput thymum. Vicissitudo cubitum comparo aspicio combibo.\nTaceo crebro consequatur votum titulus alo incidunt decretum stella tempora. Vestrum stella cunabula volo laudantium assentator utrum xiphias debilito subnecto. Claudeo absorbeo amissio.",
            coverPhoto: "https://picsum.photos/seed/uBXvUHm/640/480",
            order: 1,
            labels: [
              {
                id: "89ba5cba-2a89-4f7e-b279-884c94827c18",
                tag: "bother",
                color: "#a67bfd",
              },
              {
                id: "c5aee309-1683-4ca5-a845-a1e9ae46c655",
                tag: "misfit",
                color: "#45fa6a",
              },
              {
                id: "bcd94a89-ebcb-4c99-ab60-5fcf43cd2e55",
                tag: "publisher",
                color: "#e39af0",
              },
              {
                id: "47e4f298-df73-4fb3-9bf7-9798696968d7",
                tag: "lunge",
                color: "#933ae5",
              },
            ],
            comments: [
              {
                id: "ff36ae16-7fd1-4d0e-8029-0215856f8777",
                content: "Absque alo volutabrum concido.",
                author: {
                  id: "b7109e68-0500-4a76-9d93-4a15cbafb907",
                  username: "Francis15",
                  email: "Flavie.Lynch-Hessel@yahoo.com",
                  profileImage:
                    "https://avatars.githubusercontent.com/u/78545445",
                },
                createdAt: "2024-08-14T19:19:49.285Z",
              },
              {
                id: "692fac91-005f-47ae-9659-10dc60b45a4e",
                content: "Vindico vigor solutio.",
                author: {
                  id: "b2fc4369-a0f9-459d-a9a7-a782fb4e400c",
                  username: "Urban.Braun",
                  email: "Jerrell.Turcotte@yahoo.com",
                  profileImage:
                    "https://avatars.githubusercontent.com/u/24087111",
                },
                createdAt: "2024-08-15T07:29:33.610Z",
              },
            ],
            attachments: [
              {
                id: "bf873fb6-e19a-4e90-8504-7ed4e58daedb",
                content: "Image File",
                downloadUrl: "https://picsum.photos/seed/hWU4K/640/480",
                author: {
                  id: "c771ea62-3524-4c8f-89c3-2c36a04df965",
                  username: "Alphonso.Wisozk",
                  email: "Doug_Bechtelar@hotmail.com",
                  profileImage:
                    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1005.jpg",
                },
                createdAt: "2024-08-15T01:47:47.222Z",
              },
              {
                id: "756da78b-17a0-44e6-8e6b-239579366a25",
                content: "Image File",
                downloadUrl:
                  "https://loremflickr.com/640/480?lock=7378703824715776",
                author: {
                  id: "ba1a53c8-3dfa-44d1-82bf-c62817772c40",
                  username: "Pascale85",
                  email: "Tyrese_Kuhic23@gmail.com",
                  profileImage:
                    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/441.jpg",
                },
                createdAt: "2024-08-15T07:56:51.806Z",
              },
            ],
            createdAt: "2024-08-15T12:19:23.040Z",
          },
          {
            id: "a7488f81-dfff-44d3-bd06-855be18270e7",
            taskId: "023174d2-cea1-4465-95e0-a9b556368e55",
            title: "Gorgeous Wooden Car",
            description:
              "Infit colligo curvo pauper. Deripio officia torqueo quae. Delectatio crustulum candidus bis acsi videlicet urbs.\nId appono patrocinor brevis reprehenderit doloribus. Congregatio absorbeo utor qui suus sum adulatio absque caveo. Delibero sed provident coniecto comptus sublime canonicus defleo.",
            coverPhoto: "https://picsum.photos/seed/WApPEql/640/480",
            order: 2,
            labels: [
              {
                id: "fa72ff2e-fecf-439a-b0d2-17a34b41196a",
                tag: "roundabout",
                color: "#4beb4a",
              },
              {
                id: "c8897609-0a38-45d6-b04f-bca5dee45ec2",
                tag: "step-daughter",
                color: "#3bea9d",
              },
              {
                id: "f111a8db-bb02-41e8-954c-e7ead1f62e5e",
                tag: "xylophone",
                color: "#588918",
              },
              {
                id: "41b915e0-05c3-4dad-a0c7-4c885c70512f",
                tag: "cartilage",
                color: "#6405db",
              },
              {
                id: "be921275-0657-43e0-abd5-bed7fe94078f",
                tag: "merchant",
                color: "#d73d2a",
              },
            ],
            comments: [
              {
                id: "5be5adb7-9a37-43f9-b69e-1cd0865c5e76",
                content:
                  "Depereo derideo volubilis tametsi videlicet ventosus anser.",
                author: {
                  id: "c771ea62-3524-4c8f-89c3-2c36a04df965",
                  username: "Alphonso.Wisozk",
                  email: "Doug_Bechtelar@hotmail.com",
                  profileImage:
                    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1005.jpg",
                },
                createdAt: "2024-08-15T03:20:00.238Z",
              },
              {
                id: "06b70a41-e362-4c22-8e37-457943fa1b80",
                content:
                  "Arceo aequitas tui constans vulgaris corona summa acquiro cupio.",
                author: {
                  id: "d5caa228-e797-4b9b-bdec-785535fd1fc2",
                  username: "Kelli.Osinski72",
                  email: "Geovanni_Gleichner@hotmail.com",
                  profileImage:
                    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/576.jpg",
                },
                createdAt: "2024-08-15T00:55:46.481Z",
              },
              {
                id: "2bb1d4f5-a536-4823-9ef0-51f9b345896c",
                content: "Aequus cilicium tricesimus valens aptus aurum careo.",
                author: {
                  id: "e3f7f18f-b6dc-4901-b36b-09a80d44695c",
                  username: "Cleveland_Heathcote",
                  email: "Cedrick.Lindgren25@hotmail.com",
                  profileImage:
                    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/894.jpg",
                },
                createdAt: "2024-08-14T20:15:52.445Z",
              },
              {
                id: "cac07c47-ba9e-4591-91a4-c40a65e5119e",
                content:
                  "Urbs condico adsidue deficio amor sono ustilo vestigium.",
                author: {
                  id: "034b5131-5396-4dce-b31e-e80e876f7527",
                  username: "Brook.VonRueden72",
                  email: "Nicklaus_Williamson32@yahoo.com",
                  profileImage:
                    "https://avatars.githubusercontent.com/u/40334244",
                },
                createdAt: "2024-08-14T23:43:43.020Z",
              },
              {
                id: "049f31e3-fe6a-4271-b8a8-b472ca953796",
                content: "Soluta uxor anser solitudo supra.",
                author: {
                  id: "c771ea62-3524-4c8f-89c3-2c36a04df965",
                  username: "Alphonso.Wisozk",
                  email: "Doug_Bechtelar@hotmail.com",
                  profileImage:
                    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1005.jpg",
                },
                createdAt: "2024-08-15T17:21:40.640Z",
              },
            ],
            attachments: [
              {
                id: "25d7263e-3f25-4178-a545-f30955b935d4",
                content: "Image File",
                downloadUrl:
                  "https://loremflickr.com/640/480?lock=7144707043885056",
                author: {
                  id: "ddeaee7c-d911-4a05-83ea-951c625aeea2",
                  username: "Koby.Nienow",
                  email: "Marty_OConnell91@hotmail.com",
                  profileImage:
                    "https://avatars.githubusercontent.com/u/63974396",
                },
                createdAt: "2024-08-14T22:05:49.694Z",
              },
            ],
            createdAt: "2024-08-14T20:10:35.164Z",
          },
          {
            id: "f13ff3a6-9355-4fe8-96cf-a34eb1f3e93e",
            taskId: "74a1e142-e252-4265-b521-e3ecddda73e3",
            title: "Fantastic Granite Chair",
            description:
              "Suffoco balbus deprimo rerum veniam crebro itaque benevolentia soluta velut. Sublime caelum asperiores conqueror quaerat anser. Congregatio adsidue tero culpo solum sono magnam stipes aptus sopor.\nVoro venio tenuis. Depromo crur sufficio spectaculum quidem. Centum auditor caritas cras absorbeo tertius aduro vito.",
            coverPhoto: "https://picsum.photos/seed/H9zyUdt/640/480",
            order: 3,
            labels: [
              {
                id: "9d24720e-c278-46b3-92fa-29ef289bd2a3",
                tag: "yam",
                color: "#7c8a2f",
              },
              {
                id: "c1ae1d44-14fd-4967-a8ae-ae3261182d1d",
                tag: "shaker",
                color: "#94bef8",
              },
              {
                id: "3ea1a30d-dbba-4891-8a79-401be04cc8a8",
                tag: "stylus",
                color: "#dca3f5",
              },
            ],
            comments: [
              {
                id: "832722f9-d275-47b6-9d05-545b88f2b3b6",
                content:
                  "Admoneo natus tum audax tempus triumphus viridis paulatim laudantium tergiversatio.",
                author: {
                  id: "ba1a53c8-3dfa-44d1-82bf-c62817772c40",
                  username: "Pascale85",
                  email: "Tyrese_Kuhic23@gmail.com",
                  profileImage:
                    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/441.jpg",
                },
                createdAt: "2024-08-15T16:43:53.342Z",
              },
            ],
            attachments: [
              {
                id: "2e68ee7e-752a-47ce-b5f5-bd8bbbf8c0e6",
                content: "PDF Document",
                downloadUrl: "https://friendly-thrift.name/file.pdf",
                author: {
                  id: "ddeaee7c-d911-4a05-83ea-951c625aeea2",
                  username: "Koby.Nienow",
                  email: "Marty_OConnell91@hotmail.com",
                  profileImage:
                    "https://avatars.githubusercontent.com/u/63974396",
                },
                createdAt: "2024-08-15T16:44:28.779Z",
              },
            ],
            createdAt: "2024-08-15T08:52:00.198Z",
          },
        ],
      },
    ],
  };
  return (
    <>
      {/* <SheetHeader className="mb-3">
        <SheetTitle>{board.title}</SheetTitle>
      </SheetHeader>

      <Separator className="mb-4 border bg-slate-300" /> */}
      <h1>Hello compoennt</h1>
    </>
  );
}
