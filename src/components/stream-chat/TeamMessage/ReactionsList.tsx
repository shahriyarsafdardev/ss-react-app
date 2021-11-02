import React, { Suspense, useMemo, useState } from 'react';

import { useEmojiContext, useMessageContext } from 'stream-chat-react';

import type { NimbleEmojiProps } from 'emoji-mart';
import type { ReactionResponse } from 'stream-chat';
import { getStrippedEmojiData, ReactionEmoji } from './emojiData';
import './TeamMessage.css';
import type {
  TeamAttachmentType,
  TeamChannelType,
  TeamCommandType,
  TeamEventType,
  TeamMessageType,
  TeamReactionType,
  TeamUserType
} from '../../../pages/dashboard/cohorts/messaging/Messaging';

export type SimpleReactionsListProps<
  Re extends TeamReactionType = TeamReactionType,
  Us extends TeamUserType = TeamUserType
> = {
  /** Function that adds/removes a reaction on a message (overrides the function stored in `MessageContext`) */
  handleReaction?: (reactionType: string, event: React.BaseSyntheticEvent) => Promise<void>;
  /** An object that keeps track of the count of each type of reaction on a message */
  reaction_counts?: any;
  /** A list of the currently supported reactions on a message */
  reactionOptions?: ReactionEmoji[];
  /** An array of the reaction objects to display in the list */
  reactions?: ReactionResponse<Re, Us>[];
  message?: any;
};

const UnMemoizedSimpleReactionsList = <
  At extends TeamAttachmentType = TeamAttachmentType,
  Ch extends TeamChannelType = TeamChannelType,
  Co extends TeamCommandType = TeamCommandType,
  Ev extends TeamEventType = TeamEventType,
  Me extends TeamMessageType = TeamMessageType,
  Re extends TeamReactionType = TeamReactionType,
  Us extends TeamUserType = TeamUserType
>(
  props: SimpleReactionsListProps<Re, Us>
) => {
  const {
    handleReaction: propHandleReaction,
    reactionOptions: propReactionOptions,
    message
  } = props;

  const { Emoji, emojiConfig } = useEmojiContext();
  const { handleReaction: contextHandleReaction } = useMessageContext<At, Ch, Co, Ev, Me, Re, Us>();

  const { defaultMinimalEmojis, emojiData: fullEmojiData, emojiSetDef } = emojiConfig || {};

  const [tooltipReactionType, setTooltipReactionType] = useState<string>('');

  const handleReaction = propHandleReaction || contextHandleReaction;
  const reactions = message.latest_reactions || [];
  const reactionCounts = message.reaction_counts || {};
  const reactionOptions = propReactionOptions || defaultMinimalEmojis;
  const reactionsAreCustom = !!propReactionOptions?.length;

  const emojiData = useMemo(
    () => (reactionsAreCustom ? fullEmojiData : getStrippedEmojiData(fullEmojiData)),
    [fullEmojiData, reactionsAreCustom]
  );

  if (!reactions.length) return null;

  const getUsersPerReactionType = (type: string) =>
    reactions
      .map((reaction: any) => {
        if (reaction.type === type) {
          return reaction.user?.name || reaction.user?.id;
        }
        return null;
      })
      .filter(Boolean);

  const getEmojiByReactionType = (type: string) => {
    const reactionEmoji = reactionOptions.find((option: ReactionEmoji) => option.id === type);
    return reactionEmoji;
  };

  const getSupportedReactionMap = () => {
    const reactionMap: Record<string, boolean> = {};
    reactionOptions.forEach(({ id }: any) => (reactionMap[id] = true));
    return reactionMap;
  };

  const messageReactionTypes = Object.keys(reactionCounts);
  const supportedReactionMap = getSupportedReactionMap();

  const supportedReactionsArePresent = messageReactionTypes.some(
    (type) => supportedReactionMap[type]
  );

  if (!supportedReactionsArePresent) return null;

  return (
    <ul className="str-chat__simple-reactions-list" onMouseLeave={() => setTooltipReactionType('')}>
      {Object.keys(reactionCounts).map((reactionType, i) => {
        const emojiObject = getEmojiByReactionType(reactionType);

        return emojiObject ? (
          <li key={`${emojiObject.id}-${i}`} className="str-chat__simple-reactions-list-item">
            <span
              onClick={(event) => handleReaction(reactionType, event)}
              onMouseEnter={() => setTooltipReactionType(reactionType)}
              role="button"
              onKeyPress={() => {}}
              tabIndex={0}
            >
              <Emoji data={emojiData} emoji={emojiObject} size={13} {...emojiSetDef} />
              <span style={{ marginLeft: '.25rem', fontSize: 'x-Small' }}>
                {reactionCounts[reactionType]}
              </span>
            </span>
            {tooltipReactionType === emojiObject.id && (
              <div className="str-chat__simple-reactions-list-tooltip">
                <div className="arrow" />
                {getUsersPerReactionType(tooltipReactionType)?.join(', ')}
              </div>
            )}
          </li>
        ) : null;
      })}
    </ul>
  );
};

export const ReactionsList = React.memo(
  UnMemoizedSimpleReactionsList
) as typeof UnMemoizedSimpleReactionsList;
