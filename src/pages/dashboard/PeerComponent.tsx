export default function PeerComponent(peer: any) {
  // console.log('Peer:', peer);
  // eslint-disable-next-line no-debugger
  // debugger;
  return (
    <>
      <div>{peer.peer.slug}</div>
      {/* <div>{peer.peer.first_name}</div> */}
    </>
  );
}
