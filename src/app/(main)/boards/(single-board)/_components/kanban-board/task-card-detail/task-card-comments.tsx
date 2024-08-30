"use client";
import {
  AutosizeTextarea,
  AutosizeTextAreaRef,
} from "@/components/ui/autosize-textarea";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCardStore } from "@/lib/store/useCardStore";
import { formatDate } from "@/lib/utils";

import { TBoardTaskCard, TComment } from "@/types";
import {
  useCreateComment,
  useDeleteComment,
  useUpdateComment,
} from "@/utils/hooks/useBoards";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";

const userImage =
  "https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1080&crop=smart&auto=webp&s=28c3ad73cff636f7ba478a0c19d734cd538949d4";

export default function TaskCardComments({
  isVisitor,
}: {
  isVisitor: boolean;
}) {
  const { userId } = useAuth();
  const { card } = useCardStore();
  if (!userId) return null;
  const [comments, setComments] = useState(card.comments);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setComments(card.comments);
  }, [card]);

  const { mutateAsync: createCommentAsync, isPending: isCreatingComment } =
    useCreateComment();

  const handleAddComment = async () => {
    if (!commentText || isCreatingComment) return;

    const payload = {
      authorId: userId,
      cardId: card.cardId,
      content: commentText,
    };

    const res = await createCommentAsync(payload);
    if (res.success) {
      setCommentText("");
    }
  };

  return (
    <div className="">
      <div className="py-2 text-xs font-bold">Comments</div>
      {!isVisitor && (
        <div className="px-0.5">
          <div className="relative">
            <div className="absolute left-2 top-2 h-7 w-7 overflow-hidden rounded-md">
              <img className="size-full object-cover" src={userImage} alt="" />
            </div>
            <div className="">
              <AutosizeTextarea
                disabled={isCreatingComment}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                minHeight={50}
                className="min-h-[50px] resize-none pl-[42px] pt-[10px] text-xs focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Write a comment "
              />
            </div>
          </div>

          <div className="flex justify-end py-2">
            <Button
              onClick={handleAddComment}
              disabled={isCreatingComment}
              size={"sm"}
              className="h-fit py-1 text-[10px]"
            >
              add comment
            </Button>
          </div>
        </div>
      )}
      <div className="mt-4 flex flex-col gap-2 px-2 py-3">
        {comments.map((comment) => {
          const isAuthor = comment.author.id === userId;
          return (
            <CommentCard
              isAuthor={isAuthor}
              authorId={userId}
              key={comment.commentId}
              comment={comment}
            />
          );
        })}
      </div>
    </div>
  );
}

function CommentCard({
  comment,
  isAuthor,
  authorId,
}: {
  comment: TComment;
  isAuthor: boolean;
  authorId: string;
}) {
  const [commentText, setCommentText] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setCommentText(comment.content);
  }, [comment]);

  const commentRef = useRef<AutosizeTextAreaRef | null>(null);

  useEffect(() => {
    if (isEditing && commentRef?.current) {
      const commentAreaElement = commentRef.current.textArea;
      commentAreaElement.focus();
      // Move the cursor to the end of the text
      commentAreaElement.setSelectionRange(
        commentAreaElement.value.length,
        commentAreaElement.value.length,
      );
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default action of the Enter key
      saveEditChanges();
      setIsEditing(false);
    }
  };
  const handleBlur = () => {
    saveEditChanges();
    setIsEditing(false); // Set rename to false when losing focus
  };

  const saveEditChanges = async () => {
    setIsEditing(false);
    if (isUpdatingComment) return;
    const payload = {
      commentId: comment.commentId,
      content: commentText,
      authorId: authorId,
    };
    const res = await updateCommentAsync(payload);
    if (res.success) {
    }
  };

  const { mutateAsync: deleteCommentAsync, isPending: isDeletingComment } =
    useDeleteComment();
  const { mutateAsync: updateCommentAsync, isPending: isUpdatingComment } =
    useUpdateComment();

  const handleEditComment = async () => {
    saveEditChanges();
  };

  const handleDeleteComment = async () => {
    if (isDeletingComment) return;

    const payload = {
      commentId: comment.commentId,
      authorId,
    };

    const res = await deleteCommentAsync(payload);
    if (res.success) {
    }
  };

  return (
    <>
      <div className="mb-4 space-y-2 border-b border-b-slate-300 pb-1">
        <div className="flex gap-2">
          <div className="h-8 w-8 overflow-hidden rounded-md">
            <img
              className="size-full object-cover"
              src={comment.author.profileImage}
              alt={comment.author.username}
            />
          </div>
          <div className="flex flex-col gap-[3px]">
            <p className="text-xs font-bold">{comment.author.username}</p>
            <p className="text-[10px] text-gray-500">
              {formatDate(comment.createdAt)}
            </p>
          </div>
          {isAuthor && (
            <div className="ml-auto flex items-center gap-2 self-start">
              {!isEditing && (
                <p
                  onClick={() => setIsEditing(true)}
                  className="cursor-pointer text-center text-[10px] font-semibold text-gray-500 hover:underline"
                >
                  Edit
                </p>
              )}
              {isEditing && (
                <p
                  onClick={handleEditComment}
                  className="cursor-pointer text-center text-[10px] font-semibold text-gray-500 hover:underline"
                >
                  save
                </p>
              )}
              {isEditing && (
                <p
                  onClick={() => setIsEditing(false)}
                  className="cursor-pointer text-center text-[10px] font-semibold text-gray-500 hover:underline"
                >
                  cancel
                </p>
              )}
              {!isEditing && (
                <p
                  onClick={handleDeleteComment}
                  className="cursor-pointer text-center text-[10px] font-semibold text-gray-500 hover:underline"
                >
                  Delete
                </p>
              )}
            </div>
          )}
        </div>
        <div className="">
          {!isEditing ? (
            <p className="text-[12px]">{comment.content}</p>
          ) : (
            <AutosizeTextarea
              rows={1}
              disabled={isUpdatingComment}
              ref={commentRef}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              value={commentText}
              className="m-0 resize-none rounded-sm border border-slate-300 px-[2px] py-[2px] text-[12px] font-medium outline-0 outline-slate-800 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          )}
        </div>
      </div>
    </>
  );
}
