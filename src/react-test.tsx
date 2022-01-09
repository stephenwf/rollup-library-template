import React from 'react';

function ComponentA(props: { hello: string }) {
  return <div>hello {props.hello}!</div>
}

export function ReactTest() {
  return (
    <div>This is a test
      <>
        <ComponentA hello="world"/>
      </>
    </div>
  );
}
