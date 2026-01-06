"""removing enum from job and content status

Revision ID: 3d3b8bbf77da
Revises: f83264ce32de
Create Date: 2026-01-06 03:56:48.003816

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "3d3b8bbf77da"
down_revision: Union[str, Sequence[str], None] = "f83264ce32de"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("ALTER TYPE JobStatus TO OldJobStatus")
