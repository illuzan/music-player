import React from 'react';
import { queueSelectors, useAppSelector } from '../../store';
import { Track } from '../Track';

export function TrackItem({ id }) {
  const track = useAppSelector(state => queueSelectors.selectById(state, id));

  return <Track track={track} />;
}
