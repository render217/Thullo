import { Button } from "@/components/ui/button";

export default function TaskCardDescription() {
  return (
    <div>
      <div className="flex items-center gap-3 py-2">
        <p className="text-xs">Description</p>
        <Button
          className="h-5 px-3 text-xs font-medium"
          size={"sm"}
          variant={"outline"}
        >
          Edit
        </Button>
      </div>
      <div className="">
        <p className="text-xs">
          Ideas are created and share here through a card. Here you can describe
          what you'd like to accomplish. For example you can follow three simple
          questions to create the card related to your idea: * Why ? (Why do you
          wish to do it ?) * What ? (What it is it, what are the goals, who is
          concerned) * How ? (How do you think you can do it ? What are the
          required steps ?) After creation, you can move your card to the todo
          list. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam ex
          sapiente asperiores! Et rem iusto, nihil officiis ipsam saepe
          molestiae! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Quae amet non iure ut repellendus sequi quas, blanditiis, ipsa
          delectus omnis corrupti velit maxime, expedita et nostrum vero sint!
          Veniam magnam consequuntur dicta asperiores modi neque itaque dolorem
          dolores voluptate culpa!
        </p>
      </div>
    </div>
  );
}
